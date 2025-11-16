import { defineConfig } from 'vite';

const config = defineConfig({
    esbuild: {
        jsxFactory: 'MyReact.createElement'
    }
});

console.log(config)

export default config