"use client";

import { api } from "~/trpc/react";
import LinkedInUserCard from "./LinkedInUser";
import ConnectionsTicker from "./ConnectionsTicker";
import Ripple from "./RippleButton";
import { Progress } from "./LoadingBar";
import { useEffect, useState } from "react";
import Link from "next/link";

const HomeScreen = () => {
  const {
    data: connections,
    isFetching,
    isLoading,
  } = api.linkedIn.getConnections.useQuery();

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 20)
    return () => clearTimeout(timer)
  }, [])


  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center bg-black flex-col flex-grow">
        <Progress value={progress} className="w-96 bg-white"/>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black text-white px-5 justify-center items-center relative flex-grow">
      {/* <div className="p-4 text-right text-2xl font-bold text-white">
        <ConnectionsTicker value={connections?.length ?? 0} direction="up" className=""/>
        connections @ Lyra
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-4 overflow-y-auto p-4">
        {connections?.map((c, index) => (
          <LinkedInUserCard user={c} key={index} />
        ))}
      </div> */}
      <Link href={"/dashboard"}>
       <ConnectionsTicker value={connections?.length ?? 0} direction="up" className="text-4xl font-semibold cursor-pointer hover:text-5xl"/>
      </Link>
      <Ripple numCircles={6} className="cursor-pointer" />
    </div>
  );
};

export default HomeScreen;
