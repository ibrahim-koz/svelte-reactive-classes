import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [svelte(), dts()],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "svelteReactiveClassDecorators",
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["svelte/store"],
        },
        sourcemap: true,
    },
});
