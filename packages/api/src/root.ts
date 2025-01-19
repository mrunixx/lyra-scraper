import { authRouter } from "./router/auth";
import { linkedInRouter } from "./router/linkedIn";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  linkedIn: linkedInRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
