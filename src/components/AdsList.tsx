import React, { useEffect, useState } from 'react';
import api from '../api/api'; // глобальный axios-инстанс с JWT


interface Ad {
  id: number;
  title: string;
  description?: string; // можно добавить другие поля, если нужны
  price?: number;
  category?: string;
}


const AdsList: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    api.get('/ads')
      .then(response => {
        setAds(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Ошибка получения объявлений');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;


  return (
    <ul>
      {ads.map(ad => (
        <li key={ad.id}>
          <h3>{ad.title}</h3>
          {ad.description && <p>{ad.description}</p>}
          {ad.price !== undefined && <p>Цена: {ad.price} ₽</p>}
          {ad.category && <p>Категория: {ad.category}</p>}
        </li>
      ))}
    </ul>
  );
};


export default AdsList;
