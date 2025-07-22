import { useState } from 'react';
import { createAd } from '../api/adsApi';


export const useCreateAd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const create = async (adData: {
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrls?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createAd(adData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError('Ошибка создания объявления');
      setLoading(false);
      throw err;
    }
  };


  return { create, loading, error };
};
