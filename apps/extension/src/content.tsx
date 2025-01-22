import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { state } from "./state/extensionState";

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);


ReactDOM.createRoot(root).render(<App />);
