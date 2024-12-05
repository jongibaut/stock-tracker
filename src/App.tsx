import React, { useState, useEffect } from 'react';
import LeftForm from './views/components/LeftForm';
import TopCards from './views/components/TopCards';
import StockGraph from './views/components/StockGraph';
import { handleAddStock, handleStockUpdates } from './controllers/StockController';

const App: React.FC = () => {
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState(JSON.parse(localStorage.getItem('stockData') || '{}'));

  useEffect(() => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=ct7lr6hr01qkgg0uqem0ct7lr6hr01qkgg0uqemg');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket Data:', data); // Log parsed data
        handleStockUpdates(data, stocks, setStocks, setStockData);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => socket.close();
  }, [stocks]);

  return (
    <div>
      <LeftForm onAddStock={(stock, alertPrice) => handleAddStock(stock, alertPrice, stocks, setStocks, setStockData)} />
      <TopCards stocks={stocks} />
      <StockGraph stockData={stockData} />
    </div>
  );
};

export default App;