import "./App.css";

import { useState } from "react";
import { useSnapshot } from "valtio";

import { syncUserConnections } from "./api/connections";
import lyraLogo from "./assets/lyra-logo.svg";
import { state } from "./state/extensionState";
import Button from "./components/Button";

function App() {
  const [ready, setReady] = useState(0);
  const snapshot = useSnapshot(state);
  const handleSync = async () => {
    setReady(1);
    if (await syncUserConnections()) {
      setReady(2);
    }
  };

  const loadAuthToken = async () => {
    chrome.storage.local.get("authToken", (result) => {
      console.log(result)
      if (result.authToken) {
        state.authToken = result.authToken;
      } else {
        chrome.tabs.create({ url: "http://localhost:3000/" });
      }
    });

  };

  return (
    <div>
      <img src={lyraLogo} className="logo" alt="lyra logo" />
      {!snapshot.authToken ? (
        <Button onClick={loadAuthToken}>Sync with website</Button>
      ) : (
        <>
          {ready === 1 ? (
            <div className="items-center justify-center bg-transparent">
              <div className="lds-dual-ring"></div>
            </div>
          ) : (
            <Button onClick={handleSync}>Sync my connections</Button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
