import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "https://auto-showroom-backend.vercel.app",
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: './dist',
    },
});
