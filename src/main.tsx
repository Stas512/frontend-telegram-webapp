import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { init, miniApp } from '@telegram-apps/sdk-react';

const initializeTelegramSDK = async () => {
  try {
    await init();
    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      console.log('Telegram Mini App готово');
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram SDK:', error);
  }
};

initializeTelegramSDK();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
