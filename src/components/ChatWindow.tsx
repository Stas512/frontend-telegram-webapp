import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessages } from '../hooks/useChat';

interface Props {
  currentUserId: number;
}

const ChatWindow: React.FC<Props> = ({ currentUserId }) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { messages, loading, error, send } = useMessages(Number(chatId));
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;
    await send(text);
    setText('');
  };

  if (loading) return <div>Загрузка сообщений...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: 10, overflowY: 'auto' }}>
        {messages.map(msg => (
          <p
            key={msg.id}
            style={{ textAlign: msg.sender_id === currentUserId ? 'right' : 'left' }}
          >
            <strong>{msg.sender_id === currentUserId ? 'Вы: ' : 'Собеседник: '}</strong>{msg.text}
          </p>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение"
          style={{ width: '80%', marginRight: '1rem' }}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
};

export default ChatWindow;
