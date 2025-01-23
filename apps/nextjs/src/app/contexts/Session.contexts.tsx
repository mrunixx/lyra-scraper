"use client";

import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

export interface ISessionContext {
  session: Session | null;
}

export const SessionContext = createContext<ISessionContext>({
  session: null,
});

interface Props {
  children: ReactNode;
  session: Session | null;
}

export const SessionContextProvider = ({ children, session }: Props) => {
  if (typeof window !== "undefined") {
    chrome.runtime.sendMessage(
      "effabpboobfeemcohfmjhilfmgoclmkd",
      { authToken: session?.sessionToken },
      (res) => {
        console.log(res);
      },
    );
  }

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
