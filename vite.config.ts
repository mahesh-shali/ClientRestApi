import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Ensure TypeScript recognizes the returned configuration
export default defineConfig(({ mode }: { mode: string }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Determine if we're in production
  const isProduction = mode === "production";

  // HTTPS options for local development
  const httpsOptions: boolean | { key: Buffer; cert: Buffer } = !isProduction
    ? {
        key: fs.readFileSync(env.VITE_SSL_KEY || "./cert/key.pem"),
        cert: fs.readFileSync(env.VITE_SSL_CERT || "./cert/cert.pem"),
      }
    : false;

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
      https: httpsOptions, // Only enable HTTPS for local development
      host: env.VITE_SERVER_HOST || "localhost", // Host for local development
      port: parseInt(env.VITE_SERVER_PORT) || 5173, // Port for local development
      hmr: {
        protocol: isProduction ? "wss" : "ws", // Use `wss` in production for secure connections
        host: env.VITE_HMR_HOST || "localhost",
        port: parseInt(env.VITE_HMR_PORT) || (isProduction ? 443 : 5173),
      },
      historyApiFallback: true, // Handle SPA routing
    },
    preview: {
      // Preview server configuration (after `vite build`)
      host: env.VITE_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_SERVER_PORT) || 4173,
      https: httpsOptions, // Only enable HTTPS for local preview
    },
  };
});
