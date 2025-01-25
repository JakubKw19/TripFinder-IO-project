import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to React with TypeScript!</h1>
    </div>
  );
};

// Render Application
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
