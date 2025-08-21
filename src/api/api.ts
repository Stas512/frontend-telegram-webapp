import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://my-ad-app-backend.vercel.app/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // важно для отправки httpOnly cookie с refresh token
});

// Добавляем interceptor для автоматического добавления access token в заголовки
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor для обработки 401 и обновления токена
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Проверяем, что ошибка 401 и что запрос ещё не был повторён,
    // и чтобы не зациклить запрос обновления
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Запрашиваем новый access token по refresh token (cookie)
        const { data } = await api.post('/auth/refresh');

        // Сохраняем новый access token
        localStorage.setItem('jwtToken', data.accessToken);

        // Обновляем заголовок Authorization в оригинальном запросе
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        // Повторяем исходный запрос с новым токеном
        return api(originalRequest);
      } catch (refreshError) {
        // Если обновление не удалось — перенаправляем на страницу логина
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Для других ошибок просто отклоняем промис
    return Promise.reject(error);
  }
);

export default api;
