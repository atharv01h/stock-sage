import React, { useState } from 'react';
import { Search, TrendingUp, Filter } from 'lucide-react';
import StockCard from './StockCard';
import StockChart from './StockChart';
import { mockStocks, mockHistoricalData } from '../data/mockData';

const StockDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);
  
  const filteredStocks = mockStocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Market Dashboard</h2>
        <p className="text-gray-400">Real-time insights and predictions for global markets</p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-500" size={18} />
        </div>
        <input
          type="text"
          className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search stocks by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/5 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedStock.name} ({selectedStock.symbol})</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">${selectedStock.price.toFixed(2)}</span>
                <span className={`text-sm ${selectedStock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <select className="bg-gray-700 text-white px-3 py-1 rounded-md focus:outline-none">
                <option value="1d">1D</option>
                <option value="1w">1W</option>
                <option value="1m">1M</option>
                <option value="3m">3M</option>
                <option value="1y">1Y</option>
              </select>
              <button className="bg-gray-700 text-white p-1 rounded-md">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <StockChart data={mockHistoricalData} />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Open</p>
              <p className="text-white font-medium">${(selectedStock.price - 2.34).toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">High</p>
              <p className="text-white font-medium">${(selectedStock.price + 4.12).toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Low</p>
              <p className="text-white font-medium">${(selectedStock.price - 5.67).toFixed(2)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Volume</p>
              <p className="text-white font-medium">3.2M</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-white font-medium mb-2">AI Prediction</h4>
            <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
              <div className="flex items-center mb-2">
                <TrendingUp size={18} className="text-indigo-500 mr-2" />
                <span className="text-white font-medium">Next 7 Days Forecast</span>
              </div>
              <p className="text-gray-300 mb-2">
                Based on technical analysis and market sentiment, {selectedStock.symbol} is likely to 
                {selectedStock.change >= 0 ? ' continue its upward trend' : ' recover from recent losses'} 
                with a predicted price target of ${(selectedStock.price * 1.08).toFixed(2)} within the next week.
              </p>
              <div className="flex items-center">
                <div className="h-2 bg-gray-600 rounded-full flex-1">
                  <div 
                    className="h-2 bg-green-500 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <span className="text-white font-medium ml-2">75% Confidence</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/5 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Top Movers</h3>
            <div className="space-y-3">
              {mockStocks.slice(0, 5).map(stock => (
                <StockCard 
                  key={stock.symbol} 
                  stock={stock} 
                  onClick={() => setSelectedStock(stock)}
                  isSelected={selectedStock.symbol === stock.symbol}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Market Indices</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md transition-colors">
                <div>
                  <p className="text-white font-medium">NIFTY 50</p>
                  <p className="text-gray-400 text-sm">India</p>
                </div>
                <div className="text-right">
                  <p className="text-white">22,456.80</p>
                  <p className="text-green-500 text-sm">+0.87%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md transition-colors">
                <div>
                  <p className="text-white font-medium">SENSEX</p>
                  <p className="text-gray-400 text-sm">India</p>
                </div>
                <div className="text-right">
                  <p className="text-white">73,895.54</p>
                  <p className="text-green-500 text-sm">+0.92%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md transition-colors">
                <div>
                  <p className="text-white font-medium">S&P 500</p>
                  <p className="text-gray-400 text-sm">USA</p>
                </div>
                <div className="text-right">
                  <p className="text-white">5,234.32</p>
                  <p className="text-red-500 text-sm">-0.21%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md transition-colors">
                <div>
                  <p className="text-white font-medium">NASDAQ</p>
                  <p className="text-gray-400 text-sm">USA</p>
                </div>
                <div className="text-right">
                  <p className="text-white">16,781.45</p>
                  <p className="text-red-500 text-sm">-0.35%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;