import { useState, useEffect } from 'react';
import { fetchChats, fetchMessages, sendMessage } from '../api/chatApi';

// Обязательно экспортируем интерфейс Chat
export interface Chat {
  id: number;
  user1_id: number;
  user2_id: number;
  updated_at?: string;
  // добавьте остальные свойства, если есть
}

// Обязательно экспортируем интерфейс Message
export interface Message {
  id: number;
  chat_id: number;
  sender_id: number;
  text: string;
  created_at?: string;
  // добавьте дополнительные поля по необходимости
}

// Хук загрузки чатов
export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChats()
      .then(res => setChats(res.data))
      .catch(() => setError('Не удалось загрузить чаты'))
      .finally(() => setLoading(false));
  }, []);

  return { chats, loading, error };
};

// Хук загрузки сообщений чата
export const useMessages = (chatId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) return;
    setLoading(true);

    fetchMessages(chatId)
      .then(res => setMessages(res.data))
      .catch(() => setError('Не удалось загрузить сообщения'))
      .finally(() => setLoading(false));
  }, [chatId]);

  const send = async (text: string) => {
    try {
      await sendMessage(chatId, text);
      // По желанию обновить после отправки:
      const res = await fetchMessages(chatId);
      setMessages(res.data);
    } catch {
      setError('Не удалось отправить сообщение');
    }
  };

  return { messages, loading, error, send };
};
