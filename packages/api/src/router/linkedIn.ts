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
  addConnection: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        entityUrn: z.string().min(1),
        headline: z.string().min(1),
        publicIdentifier: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { entityUrn, firstName, lastName, headline, publicIdentifier } =
        input;
      await ctx.db.insert(linkedInUsers).values({
        entityUrn,
        firstName,
        lastName,
        headline,
        publicIdentifier,
      });

      return { success: true, message: "User added succesfully." };
    }),
});
