import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { linkedInUsers } from "../../../db/src/schema";

export const linkedInRouter = createTRPCRouter({
  getConnections: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.query.linkedInUsers.findMany();
    }),
  addConnection: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      entityUrn: z.string().min(1),
      headline: z.string().min(1),
      publicIdentifier: z.string().min(1),
    }))
    .mutation(async({ input, ctx }) => {
      const { entityUrn, firstName, lastName, headline, publicIdentifier } = input;
      await ctx.db.insert(linkedInUsers).values({
        entityUrn,
        firstName,
        lastName,
        headline,
        publicIdentifier,
      })

      return { success: true, message: "User added succesfully."}
    })
});
