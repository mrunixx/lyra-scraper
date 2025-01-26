"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "~/trpc/react";
import ConnectionsTicker from "./ConnectionsTicker";
import { Progress } from "./LoadingBar";
import Ripple from "./RippleButton";

const HomeScreen = () => {
  const {
    data: connections,
    isFetching,
    isLoading,
  } = api.linkedIn.getConnections.useQuery({ value: "" });

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 20);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center bg-black">
        <Progress value={progress} className="w-96 bg-white" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-grow flex-col items-center justify-center bg-black px-5 text-white">
      <Link href={"/dashboard"}>
        <ConnectionsTicker
          value={connections?.length ?? 0}
          direction="up"
          className="cursor-pointer text-4xl font-semibold hover:text-5xl"
        />
      </Link>
      <Ripple numCircles={6} className="cursor-pointer" />
    </div>
  );
};

export default HomeScreen;
