import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToAI } from '../services/openRouterService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm StockSage AI, your personal stock market prediction assistant. I can help you analyze stocks, predict market trends, and provide investment insights for both Indian and global markets. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(input, messages);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderSuggestions = () => {
    const suggestions = [
      "Predict RELIANCE stock for next week",
      "Should I invest in HDFC Bank?",
      "Compare TCS and Infosys",
      "What's your outlook on NIFTY for next month?",
      "Who created you?"
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="bg-gray-800/50 hover:bg-gray-700 text-gray-300 text-sm rounded-full px-4 py-2 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            onClick={() => setInput(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex items-center justify-center p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <Bot className="text-indigo-500 mr-2" size={24} />
        <h1 className="text-xl font-bold text-white">StockSage AI</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 fadeIn ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 ${message.role === 'assistant' ? 'bg-indigo-600' : 'bg-gray-700'} rounded-full p-2 shadow-lg`}>
                {message.role === 'assistant' ? (
                  <Bot size={18} className="text-white" />
                ) : (
                  <User size={18} className="text-white" />
                )}
              </div>
              <div className={`flex flex-col space-y-1 max-w-[85%] sm:max-w-[75%]`}>
                <div className={`${
                  message.role === 'assistant' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-indigo-600 text-white'
                } rounded-2xl px-4 py-3 shadow-lg transform transition-all duration-200`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 self-end px-2">
                  {new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full p-2 shadow-lg">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-gray-800 rounded-2xl px-4 py-3 flex items-center space-x-2 max-w-[85%] sm:max-w-[75%] shadow-lg">
                <div className="dot-typing"></div>
                <span className="text-gray-400">StockSage is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          {messages.length === 1 && !isLoading && renderSuggestions()}
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about stocks, market trends, or investment advice..."
              className="w-full bg-gray-800/50 text-white rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none shadow-lg backdrop-blur-sm"
              style={{ minHeight: '50px', maxHeight: '120px' }}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2.5 transition-all hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;