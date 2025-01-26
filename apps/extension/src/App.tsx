import "./App.css";

import { useState } from "react";

import { syncUserConnections } from "./api/connections";
import lyraLogo from "./assets/lyra-logo.svg";

function App() {
  const [ready, setReady] = useState(0);
  const handleSync = async () => {
    setReady(1);
    if (await syncUserConnections()) {
      setReady(2);
    }
  };

  return (
    <div>
      <img src={lyraLogo} className="logo" alt="lyra logo" />
      {ready === 1 ? (
        <div
          className="items-center justify-center bg-transparent"
        >
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <button onClick={handleSync}>Sync my connections</button>
      )}
    </div>
  );
}

export default App;
