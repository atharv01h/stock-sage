import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Stock } from '../types';

interface WatchlistItemProps {
  stock: Stock;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
      <div className="flex flex-col">
        <span className="text-white font-medium">{stock.symbol}</span>
        <span className="text-xs text-gray-400">{stock.name}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-white">${stock.price.toFixed(2)}</span>
        <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          <span>{Math.abs(stock.change).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;