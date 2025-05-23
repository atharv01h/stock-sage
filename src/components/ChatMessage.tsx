import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex items-start space-x-3 fadeIn`}>
      <div className={`flex-shrink-0 ${isAssistant ? 'bg-indigo-600' : 'bg-gray-700'} rounded-full p-2`}>
        {isAssistant ? (
          <Bot size={18} className="text-white" />
        ) : (
          <User size={18} className="text-white" />
        )}
      </div>
      <div className="flex flex-col space-y-1 max-w-[80%]">
        <div className={`${isAssistant ? 'bg-gray-800' : 'bg-indigo-600'} rounded-lg p-3`}>
          <p className="text-white whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default ChatMessage;