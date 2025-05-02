import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      sourcemap: true,
      // rollupOptions: {
      //   external: ["react", "react-dom"],
      // },
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
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
