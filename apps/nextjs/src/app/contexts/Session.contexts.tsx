"use client";

import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [extensionId, setExtensionId] = useState("");

  useEffect(() => {
    const handleExtensionIdEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ extensionId: string }>;
      if (customEvent.detail?.extensionId) {
        setExtensionId(customEvent.detail.extensionId);
        console.log("sending token back")
        chrome.runtime.sendMessage(
          customEvent.detail.extensionId,
          { authToken: session?.sessionToken },
          (res) => {
            console.log(res);
          },
        );
      }
    };

    window.addEventListener("extensionId", handleExtensionIdEvent);

    return () => {
      window.removeEventListener("extensionId", handleExtensionIdEvent);
    };
  }, []);


  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
