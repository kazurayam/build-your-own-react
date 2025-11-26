import { defineConfig } from 'vite';

const config = defineConfig({
    esbuild: {
        jsxFactory: 'MyReact.createElement'
    },
    test: {
        environment: 'jsdom',
    }
});

//console.log(config)

export default config