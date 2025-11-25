import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';
import { Icon } from './Icon';

interface ChatWidgetProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, toggleOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false); // New state for the popup hint
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
    // Initial greeting internal state
    setMessages([
      {
        id: 'init',
        role: 'model',
        text: 'Hej! Jeg er din personlige Google Home assistent. Har du brug for hjælp til opsætningen?',
        timestamp: new Date()
      }
    ]);

    // Show hint after 1.5 seconds to grab attention
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowHint(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Close hint if chat is opened manually
  useEffect(() => {
    if (isOpen) {
      setShowHint(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleToggle = () => {
    setShowHint(false);
    toggleOpen();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Proactive Help Popup */}
        {showHint && (
          <div className="mb-4 mr-2 max-w-[250px] bg-white p-4 rounded-xl shadow-xl border border-blue-100 relative animate-[bounce_1s_infinite]">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
            <div onClick={handleToggle} className="cursor-pointer">
              <p className="font-bold text-gray-800 text-sm mb-1">Hej! 👋</p>
              <p className="text-gray-600 text-sm leading-snug">
                Har du brug for hjælp til opsætningen? Klik her for at spørge mig!
              </p>
            </div>
            {/* Speech bubble triangle */}
            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-b border-r border-blue-100"></div>
          </div>
        )}

        <button 
          onClick={handleToggle}
          className={`bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center group relative ${showHint ? 'ring-4 ring-blue-200' : ''}`}
        >
          <Icon name="messageCircle" className="w-8 h-8" />
          
          {/* Default Tooltip on Hover (only visible if hint is gone) */}
          {!showHint && (
            <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
              Spørg AI
            </span>
          )}
          
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Icon name="bot" className="w-6 h-6" />
          <h3 className="font-semibold">Google Home Assistent</h3>
        </div>
        <button onClick={toggleOpen} className="hover:bg-blue-700 p-1 rounded">
          <Icon name="x" className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 text-xs px-3 py-2 rounded-full animate-pulse">
              Tænker...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Skriv dit spørgsmål..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="send" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};