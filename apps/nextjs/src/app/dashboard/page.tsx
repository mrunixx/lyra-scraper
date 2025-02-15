"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { api } from "~/trpc/react";
import Header from "../_components/Header";
import LinkedInUserCard from "../_components/LinkedInUser";
import SearchBar from "../_components/SearchBar";

const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 40;
  const {
    data: connections = [],
    isLoading,
    refetch,
  } = api.linkedIn.getConnections.useQuery({
    value: search,
    offset: offset,
    limit,
  });
  const [users, setUsers] = useState(connections);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !isLoading && connections.length > 0) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [inView]);

  useEffect(() => {
    if (!isLoading && connections.length > 0) {
      setUsers((prev) => [...prev, ...connections]);
    }
  }, [connections, isLoading]);

  useEffect(() => {
    setOffset(0);
    setUsers([]);
    if (search === "") {
      void refetch().then(() => {
        setUsers(connections);
      });
    }
  }, [search]);

  return (
    <div className="flex h-screen w-full flex-col bg-black pb-6">
      <Header />
      <div className="mx-6 flex h-1 w-[35%] min-w-[500px] flex-grow flex-col gap-5 self-start rounded-3xl bg-white p-4">
        <SearchBar setSearch={setSearch} />
        <div className="scrollbar-white flex w-full flex-col gap-1 overflow-y-auto px-1">
          {users.map((user, index) => {
            return <LinkedInUserCard user={user} key={index} />;
          })}

          {isLoading && (
            <div className="self-center justify-self-center">
              <div className="lds-dual-ring"></div>
            </div>
          )}

          <div ref={ref} className="h-10 bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
