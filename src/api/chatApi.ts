import api from './api';

export const fetchChats = () => api.get('/chats');
export const fetchMessages = (chatId: number) => api.get(`/chats/${chatId}/messages`);
export const sendMessage = (chatId: number, text: string) => api.post(`/chats/${chatId}/messages`, { text });
