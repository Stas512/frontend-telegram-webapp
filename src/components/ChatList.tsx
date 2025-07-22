import React from 'react';
import { useChats } from '../hooks/useChat';
import type { Chat } from '../hooks/useChat';  // <-- Импорт только типа
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: number;
}

const ChatList: React.FC<Props> = ({ userId }) => {
  const { chats, loading, error } = useChats();
  const navigate = useNavigate();

  if (loading) return <div>Загрузка чатов...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  if (chats.length === 0) return <div>Чатов нет</div>;

  return (
    <ul>
      {chats.map((chat: Chat) => {
        const interlocutorId = chat.user1_id === userId ? chat.user2_id : chat.user1_id;

        return (
          <li
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
          >
            Чат с пользователем #{interlocutorId}
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
