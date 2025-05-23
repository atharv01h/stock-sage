import React from 'react';
import { TrendingUp, Menu, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-400 hover:text-white md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-indigo-500" size={24} />
          <h1 className="text-xl font-bold text-white">StockSage AI</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          className="text-gray-400 hover:text-white relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </button>
        <button 
          onClick={toggleTheme} 
          className="text-gray-400 hover:text-white"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="hidden md:block">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;