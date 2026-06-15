import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Use the local SSR wrapper so server errors render the app's fallback page.
    server: { entry: "server" },
  },
});
