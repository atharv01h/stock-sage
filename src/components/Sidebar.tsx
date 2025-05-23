import React, { useEffect } from 'react';
import { X, Home, BarChart3, TrendingUp, Star, Clock, Settings, CreditCard } from 'lucide-react';
import WatchlistItem from './WatchlistItem';
import { mockWatchlist } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 h-full bg-gray-900 border-r border-gray-800 z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <BarChart3 size={20} />
                <span>Market Overview</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <TrendingUp size={20} className="text-indigo-500" />
                <span className="text-white font-medium">Predictions</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <Star size={20} />
                <span>Watchlist</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <Clock size={20} />
                <span>History</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <CreditCard size={20} />
                <span>Portfolio</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors">
                <Settings size={20} />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">WATCHLIST</h3>
          <div className="space-y-2">
            {mockWatchlist.map((stock) => (
              <WatchlistItem key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;