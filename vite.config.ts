import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/v1": {
        changeOrigin: true,
        target: process.env.VITE_API_URL || "http://localhost:8787",
      },
    },
  },
});
