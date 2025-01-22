import { useSnapshot } from "valtio";
import "./App.css";
import lyraLogo from "./assets/lyra-logo.svg"
import { state } from "./state/extensionState";
import { useEffect } from "react";

function App() {
  const extensionState = useSnapshot(state);

  return (
      <img src={lyraLogo} className="logo" alt="Vite logo" />
  );
}

export default App;
