import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Served on the tailnet only; allow the MagicDNS names.
    allowedHosts: ['playground', '.ts.net'],
  },
})
