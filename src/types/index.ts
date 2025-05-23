export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  currency: string;
  marketCap: string;
  volume: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}