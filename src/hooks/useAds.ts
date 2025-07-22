import { useState, useEffect } from 'react';
import { fetchAds } from '../api/adsApi'; // убедитесь, что fetchAds использует api из api.ts


export const useAds = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    fetchAds()
      .then(response => {
        setAds(response.data);
        setError(null);
      })
      .catch(() => setError('Ошибка загрузки объявлений'))
      .finally(() => setLoading(false));
  }, []);


  return { ads, loading, error };
};
