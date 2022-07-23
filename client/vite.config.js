import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      "/socket.io": {
        target: "http://localhost:8006",
        changeOrigin: true,
        ws: true
      },
    },
  },
});