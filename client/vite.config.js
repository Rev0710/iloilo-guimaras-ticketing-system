import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // ...your existing config
  server: {
    port: 5173,
    strictPort: true, // fail instead of silently bumping to 5174 if taken
  },
});