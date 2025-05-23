import React from 'react';
import { MessageSquare, BarChart3, User, Search } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'chat' | 'dashboard';
  setActiveTab: (tab: 'chat' | 'dashboard') => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="md:hidden bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around">
        <button
          className={`flex flex-col items-center py-3 px-5 ${
            activeTab === 'chat' ? 'text-indigo-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={20} />
          <span className="text-xs mt-1">Chat</span>
        </button>
        <button
          className={`flex flex-col items-center py-3 px-5 ${
            activeTab === 'dashboard' ? 'text-indigo-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center py-3 px-5 text-gray-500">
          <Search size={20} />
          <span className="text-xs mt-1">Explore</span>
        </button>
        <button className="flex flex-col items-center py-3 px-5 text-gray-500">
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;