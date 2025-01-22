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

type Props = {
  children: ReactNode;
  session: Session | null;
};

export const SessionContextProvider = ({ children, session }: Props) => {
  if (typeof window !== "undefined") {
    if (chrome && chrome.runtime) {
      if (session?.token) {
        chrome.runtime.sendMessage("effabpboobfeemcohfmjhilfmgoclmkd", {authToken: session.token}, (res) => {
          console.log(res);
        });
      } else {
        chrome.runtime.sendMessage("effabpboobfeemcohfmjhilfmgoclmkd", {authToken: null}, (res) => {
          console.log(res);
        });
      }
    }
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
