import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      fs: {
        allow: [".."], // Allow the server to serve files from the parent directory
      },
      host: env.VITE_SERVER_HOST || "localhost", // Host for the dev server
      port: parseInt(env.VITE_SERVER_PORT) || 5173, // Port for the dev server
      hmr: {
        protocol: "ws", // Use WebSocket for HMR (no WSS since we're not using HTTPS)
        host: env.VITE_HMR_HOST || "localhost",
        port: parseInt(env.VITE_HMR_PORT) || 5173,
      },
      historyApiFallback: true, // Handle SPA routing
    },
    preview: {
      host: env.VITE_SERVER_HOST || "localhost", // Preview host
      port: parseInt(env.VITE_SERVER_PORT) || 4173, // Preview port
    },
  };
});
