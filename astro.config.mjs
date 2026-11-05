// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://modihydroshop.pages.dev',
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap(), react(), icon()],
});