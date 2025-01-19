import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../../packages/api/src/root"

export const client = createTRPCReact<AppRouter>();