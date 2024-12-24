// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Ensure this path is correct
import App from "./App"; // Import the default App component
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
