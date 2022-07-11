import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
});