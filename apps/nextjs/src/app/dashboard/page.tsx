"use client"
import { api } from "~/trpc/react";
import Header from "../_components/Header";

const DashboardPage = () => {
  const {
    data: connections,
    isFetching,
    isLoading,
  } = api.linkedIn.getConnections.useQuery();

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col self-center justify-self-center items-center justify-center bg-white w-[50%] h-[66%] rounded-3xl">

      </div>
    </div>
  )
};

export default DashboardPage;
