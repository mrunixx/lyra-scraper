import { Suspense } from "react";

import { HydrateClient } from "~/trpc/server";
import { auth } from "@acme/auth";
import { redirect } from "next/navigation";
import HomeScreen from "./_components/HomeScreen";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("api/auth/signin");
  }
  return (
    <HydrateClient>
      <HomeScreen /> 
    </HydrateClient>
  );
}
