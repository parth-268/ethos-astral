import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // Analyze bundle size
      mode === "production" &&
        visualizer({
          filename: "./dist/stats.html",
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "framer-motion": ["framer-motion"],
            "ui-vendor": ["lucide-react", "@radix-ui/react-toast"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: mode === "development",
    },
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion"],
    },
  };
});
