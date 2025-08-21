import React, { useEffect, useState } from 'react';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import axios, { AxiosError } from 'axios';
import AdsList from './components/AdsList';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Типы
interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  last_name?: string;
}

interface AuthResponse {
  accessToken: string;
  user: TelegramUser;
}

const App: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const initDataRaw = useSignal(initData.raw);

  useEffect(() => {
    const authenticate = async () => {
      if (!initDataRaw) {
        setError('initData отсутствует. Пожалуйста, откройте приложение через Telegram.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post<AuthResponse>(
          'https://my-ad-app-backend.vercel.app/api/auth/telegram',
          { initData: initDataRaw }
        );
        setUser(response.data.user);
        localStorage.setItem('jwtToken', response.data.accessToken);
      } catch (err) {
        let message = 'Ошибка аутентификации';
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ error?: string }>;
          if (axiosError.response?.data?.error) {
            message = axiosError.response.data.error;
          } else if (axiosError.message) {
            message = axiosError.message;
          }
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    authenticate();
  }, [initDataRaw]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <Router>
      <div>
        <h1>Привет, {user.first_name}!</h1>
        <AdsList />
        <Routes>
          <Route path="/" element={<ChatList userId={user.id} />} />
          <Route path="/chat/:chatId" element={<ChatWindow currentUserId={user.id} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
