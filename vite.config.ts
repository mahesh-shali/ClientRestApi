import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Determine if HTTPS is enabled
  const isHttps = env.VITE_SERVER_PROTOCOL === "https";

  // HTTPS options for development
  const httpsOptions =
    isHttps && env.VITE_SSL_KEY && env.VITE_SSL_CERT
      ? {
          key: fs.readFileSync(env.VITE_SSL_KEY),
          cert: fs.readFileSync(env.VITE_SSL_CERT),
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
      // https: {
      //   key: fs.readFileSync(env.VITE_SSL_KEY || "./cert/key.pem"),
      //   cert: fs.readFileSync(env.VITE_SSL_CERT || "./cert/cert.pem"),
      // },
      host: env.VITE_SERVER_HOST || "localhost", //for production ip or domain
      port: parseInt(env.VITE_SERVER_PORT) || 5173, //port that of the ip or domain
      hmr: {
        protocol: env.VITE_HMR_PROTOCOL || "ws", // Use HMR protocol from .env
        host: env.VITE_HMR_HOST || "localhost", // Use HMR host from .env
        port: parseInt(env.VITE_HMR_PORT) || 5173, // Use HMR port from .env
      },
      historyApiFallback: true, // Handle SPA routing
    },
    preview: {
      // Preview configuration (this will run after `vite build` and `vite preview`)
      // https: {
      //   key: fs.readFileSync(env.VITE_SSL_KEY || "./cert/key.pem"),
      //   cert: fs.readFileSync(env.VITE_SSL_CERT || "./cert/cert.pem"),
      // },
      host: env.VITE_SERVER_HOST || "localhost", // Preview host
      port: parseInt(env.VITE_SERVER_PORT) || 4173, // Preview port
    },
  };
});
