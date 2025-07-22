import api from './api'; // ваш axios-инстанс с interceptor для JWT


// Получить все объявления
export const fetchAds = () => api.get('/ads');


// Создать новое объявление
export const createAd = (adData: {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrls?: string[];
}) => api.post('/ads', adData);


// Обновить объявление по ID
export const updateAd = (id: number, updates: Partial<{
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
}>) => api.put(`/ads/${id}`, updates);


// Удалить объявление по ID
export const deleteAd = (id: number) => api.delete(`/ads/${id}`);
