"use client";

import { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import Header from "../_components/Header";
import LinkedInUserCard from "../_components/LinkedInUser";
import SearchBar from "../_components/SearchBar";

const DashboardPage = () => {
  const [search, setSearch] = useState("");

  const { data: connections, isLoading } = api.linkedIn.getConnections.useQuery(
    { value: search },
  );

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div className="flex h-screen w-full flex-col pb-6">
      <Header />
      <div className="mx-6 flex h-1 w-[35%] min-w-[500px] flex-grow flex-col gap-5 self-start rounded-3xl bg-white p-4">
        <SearchBar setSearch={setSearch} />
        <div className="scrollbar-white flex w-full flex-col gap-1 overflow-y-auto px-1">
          {!isLoading &&
            connections?.map((user) => {
              return <LinkedInUserCard user={user} />;
            })}

          {isLoading && (
            <div className="self-center justify-self-center">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
