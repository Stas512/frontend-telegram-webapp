import React, { useState } from 'react';
import { useCreateAd } from '../hooks/useCreateAd';


const CreateAdForm: React.FC = () => {
  const { create, loading, error } = useCreateAd();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(''); // Можно позволить пустую строку для удобства
  const [category, setCategory] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // Валидация цены (например, не принимать отрицательные значения)
    if (price === '' || price < 0) {
      alert('Введите корректную цену');
      return;
    }


    try {
      await create({ title, description, price: Number(price), category });
      alert('Объявление создано!');
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      // Здесь можно вызвать обновление списка объявлений, если нужно
    } catch {
      // Ошибка уже обработана хуком
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание"
        required
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder="Цена"
        required
        min={0}
      />
      <input
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="Категория"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Создание...' : 'Создать'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};


export default CreateAdForm;
