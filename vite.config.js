import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function productionConfigPlugin() {
  return {
    name: 'kashi-vashi-config-check',
    config(config, { mode }) {
      // Security audit: ensure no credentials/secrets are leaked through VITE_ variables
      const sensitiveKeys = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'MONGODB_URI', 'MONGO_URI', 'PASSWORD', 'SECRET'];
      for (const key of Object.keys(process.env)) {
        if (key.startsWith('VITE_') && sensitiveKeys.some(s => key.toUpperCase().includes(s))) {
          console.warn(`⚠️ [SECURITY WARNING] Found potentially sensitive variable exposed with VITE_ prefix: ${key}! Client bundle must never contain secrets.`);
        }
      }

      if (mode === 'production') {
        const targetApi = process.env.VITE_API_URL || process.env.VITE_API_BASE_URL;
        if (targetApi) {
          console.log(`🌐 [Build Info] Production API target configured: ${targetApi}`);
        } else {
          console.log(`ℹ️ [Build Info] VITE_API_BASE_URL not explicitly passed; canonical fallback active: https://kashi-vashi-backend.onrender.com`);
        }
      }
    }
  };
}

const proxyConfig = {
  '/public/partners': 'http://127.0.0.1:5001',
  '/public/leads': 'http://127.0.0.1:5001',
  '/api': 'http://127.0.0.1:5001',
  '/auth': 'http://127.0.0.1:5001',
  '/admin': {
    target: 'http://127.0.0.1:5001',
    bypass: (req) => {
      if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return '/index.html';
      }
    }
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), productionConfigPlugin()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    proxy: proxyConfig
  },
  preview: {
    host: '127.0.0.1',
    port: 5174,
    proxy: proxyConfig
  }
})
