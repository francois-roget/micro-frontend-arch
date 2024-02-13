import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		manifest: true,
	},
	plugins: [react(), basicSsl()],
	server: {
		port: 3000,
		https: true,
		open: false,
		proxy: {
			'/api': {
				target: 'https://localhost:3001/',
				changeOrigin: false,
				secure: false,
			},
		},
	},
});
