"use client"

import { api } from "~/trpc/react";
import LinkedInUserCard from "./LinkedInUser";

const HomeScreen = () => {
  const { data: connections, isFetching, isLoading } = api.linkedIn.getConnections.useQuery();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      Hello, welcome!
      {connections?.map((c) => {
        return (
          <LinkedInUserCard user={c}/>
        )
      })}
    </div>
  );
};

export default HomeScreen;
