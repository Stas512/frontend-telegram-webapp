import { useState } from 'react';
import { updateAd } from '../api/adsApi';


export const useUpdateAd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const update = async (id: number, updates: Partial<{
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrls: string[];
  }>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateAd(id, updates);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError('Ошибка обновления объявления');
      setLoading(false);
      throw err;
    }
  };


  return { update, loading, error };
};
