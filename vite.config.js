import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Pokedex/', // Replace "Pokedex" with the name of your repository
  plugins: [react()],
});
