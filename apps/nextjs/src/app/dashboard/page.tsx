"use client"
import { api } from "~/trpc/react";
import Header from "../_components/Header";
import SearchBar from "../_components/SearchBar";
import LinkedInUserCard from "../_components/LinkedInUser";

const DashboardPage = () => {
  const {
    data: connections,
    isFetching,
    isLoading,
  } = api.linkedIn.getConnections.useQuery();

  return (
    <div className="flex flex-col w-full h-screen pb-6">
      <Header />
      <div className="flex flex-col self-start bg-white w-[35%] h-[66%] rounded-3xl mx-6 flex-grow p-4 gap-5">
        <SearchBar />
        <div className="w-full overflow-y-auto flex flex-col gap-1 px-1 scrollbar-white">
          {connections?.map((user) => {
            return <LinkedInUserCard user={user}/>
          })}
        </div>
      </div>
    </div>
  )
};

export default DashboardPage;
