"use client";

import { api } from "~/trpc/react";
import LinkedInUserCard from "./LinkedInUser";

const HomeScreen = () => {
  const { data: connections, isFetching, isLoading } = api.linkedIn.getConnections.useQuery();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <header className="p-4 text-center text-2xl font-bold text-white">
        LinkedIn Connections
      </header>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-4 overflow-y-auto p-4">
        {connections?.map((c, index) => (
          <LinkedInUserCard user={c} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
