import { useState } from 'react';
import { deleteAd } from '../api/adsApi';


export const useDeleteAd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const remove = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAd(id);
      setLoading(false);
    } catch (err) {
      setError('Ошибка удаления объявления');
      setLoading(false);
      throw err;
    }
  };


  return { remove, loading, error };
};


