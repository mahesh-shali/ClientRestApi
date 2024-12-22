import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes"; // Import the generic routing entry

export function App() {
  return (
    <Router>
      <AppRoutes /> {/* Use the consolidated routes */}
    </Router>
  );
}

