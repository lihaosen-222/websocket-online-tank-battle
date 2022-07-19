import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      "/socket.io": {
        target: "http://localhost:3007",
        changeOrigin: true,
        ws: true
      },
    },
  },
});