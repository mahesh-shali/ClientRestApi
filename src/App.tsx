// src/App.tsx
import React from "react";
import { AppRoutes } from "./routes"; // Ensure this is the correct path

const App = () => {
  return (
    <div>
      <AppRoutes /> {/* Do not wrap in Router here */}
    </div>
  );
};

export default App;
