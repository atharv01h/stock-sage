import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import StockDashboard from './StockDashboard';
import MobileNav from './MobileNav';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'dashboard'>('chat');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="hidden md:flex space-x-4 px-4 py-2 bg-gray-800">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              Chat Predictions
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Market Dashboard
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' ? <ChatInterface /> : <StockDashboard />}
          </div>
        </main>
      </div>
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Layout;