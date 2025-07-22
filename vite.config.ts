import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/frontend-telegram-webapp/', // замените на имя вашего репозитория
  plugins: [react()],
});
