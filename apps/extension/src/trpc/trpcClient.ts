import { httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import SuperJSON from "superjson";

import type { AppRouter } from "../../../../packages/api/src/root";
import { state } from "../state/extensionState";

const getAuthToken = () => {
  if (state.authToken) {
    return state.authToken;
  }
  return ""
}

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
      async headers() {
        return {
          authorization: getAuthToken(),
        };
      },
      transformer: SuperJSON
    }),
  ],
});

export default client;