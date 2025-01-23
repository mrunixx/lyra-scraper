import "./App.css";
import lyraLogo from "./assets/lyra-logo.svg"
import { syncUserConnections } from "./api/connections";

function App() {
  const handleSync = () => {
    syncUserConnections();
  }

  return (
    <div>
      <img src={lyraLogo} className="logo" alt="Vite logo" />
      <button onClick={handleSync}>Sync my connections</button>
    </div>
  );
}

export default App;
