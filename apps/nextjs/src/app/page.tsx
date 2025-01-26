import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { HydrateClient } from "~/trpc/server";
import Header from "./_components/Header";
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
          <div className="flex min-h-screen flex-col">
            <Header />
            <HomeScreen />
          </div>
        </SessionContextProvider>
      </HydrateClient>
    </>
  );
}
