import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { HydrateClient } from "~/trpc/server";
import HomeScreen from "./_components/HomeScreen";
import { SessionContextProvider } from "./contexts/Session.contexts";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("api/auth/signin");
  }

  return (
    <>
      <HydrateClient>
        <SessionContextProvider session={session}>
          <HomeScreen />
        </SessionContextProvider>
      </HydrateClient>
    </>
  );
}
