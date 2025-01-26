import { z } from "zod";

import { linkedInUsers } from "../../../db/src/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sql } from "@acme/db";

export const linkedInRouter = createTRPCRouter({
  getConnections: protectedProcedure.input(
    z.object({
      value: z.string()
    })
  ).query(async ({ ctx, input }) => {
    const searchPattern = `%${input.value}%`;

    return await ctx.db.query.linkedInUsers.findMany({
      where: sql`${linkedInUsers.firstName} || ' ' || ${linkedInUsers.lastName} LIKE ${searchPattern}`,
    });
  }),
  addConnections: protectedProcedure
  .input(
    z.object({
      users: z.array(
        z.object({
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          entityUrn: z.string().min(1),
          headline: z.string().min(1),
          publicIdentifier: z.string().min(1),
        })
      ),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const users = input.users;

    try {
      const userValues = users.map((user) => ({
        entityUrn: user.entityUrn,
        firstName: user.firstName,
        lastName: user.lastName,
        headline: user.headline,
        publicIdentifier: user.publicIdentifier,
      }));

      await ctx.db.insert(linkedInUsers).values(userValues);

      return { success: true, message: `${users.length} users added successfully.` };
    } catch (e) {
      console.warn('Failed to add connections in batch:', e);
      return { success: false, message: 'Failed to add users in batch.' };
    }
  }),
});
