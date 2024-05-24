import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		minify: false,
	},
	esbuild: {
		jsxInject: 'import * as Kawai from "@/lib/kawai"',
		jsxFactory: "Kawai.create",
		jsxFragment: "Fragment",
	},
});
