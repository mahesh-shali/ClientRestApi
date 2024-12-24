import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    fs: {
      allow: ['..'],  // Allow the server to serve files from the parent directory
    },
    // Add this option to handle routing properly in SPA mode
    historyApiFallback: true,  // Make sure the app works on page refresh for SPA routing
  },
});
