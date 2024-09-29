import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import env from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
