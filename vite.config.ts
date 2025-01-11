import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      target: "esnext",
      outDir: "dist", // Ensure the output is in the "dist" folder
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
      host: env.VITE_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_SERVER_PORT) || 5173,
      hmr: {
        protocol: env.VITE_HMR_PROTOCOL || "ws",
        host: env.VITE_HMR_HOST || "localhost",
        port: parseInt(env.VITE_HMR_PORT) || 5173,
      },
      historyApiFallback: true,
    },
    preview: {
      host: env.VITE_SERVER_HOST || "localhost",
      port: parseInt(env.VITE_SERVER_PORT) || 4173,
    },
  };
});
