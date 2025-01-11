import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables from the .env file
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      fs: {
        allow: [".."],
      },
      host: env.VITE_SERVER_HOST || "localhost", // Use local server or expose to LAN
      port: parseInt(env.VITE_SERVER_PORT) || 5173, // Set the port for the dev server
      hmr: {
        protocol: env.VITE_HMR_PROTOCOL || "ws", // Use 'ws' for unencrypted HMR connection
        host: env.VITE_HMR_HOST || "localhost", // HMR host
        port: parseInt(env.VITE_HMR_PORT) || 5173, // HMR port
      },
      historyApiFallback: true, // Handle SPA routing
    },
    preview: {
      // Configure preview after build (optional)
      host: env.VITE_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_SERVER_PORT) || 4173,
    },
  };
});
