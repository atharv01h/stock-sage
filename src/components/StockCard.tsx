import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Stock } from '../types';

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
  isSelected: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onClick, isSelected }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <div 
      className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all ${
        isSelected ? 'bg-indigo-900 bg-opacity-50' : 'hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      <div>
        <div className="flex items-center">
          <span className="text-white font-medium">{stock.symbol}</span>
          {isSelected && <span className="ml-2 bg-indigo-500 text-xs text-white px-1.5 py-0.5 rounded">Selected</span>}
        </div>
        <p className="text-gray-400 text-sm">{stock.name}</p>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">${stock.price.toFixed(2)}</p>
        <div className={`flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span>{Math.abs(stock.change).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;