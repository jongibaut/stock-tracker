
import { subscribeToStock, listenToStockUpdates } from '../services/socketService';
import { sendNotification } from '../services/notificationService';

export const handleAddStock = (stock: string, alertPrice: number, stocks: any[], setStocks: any, setStockData: any) => {
  console.log({stock, alertPrice, stocks });
  subscribeToStock(stock);
  setStocks((prev: any) => [...prev, { stock, value: 0, change: 0, alertPrice }]);
};

export const handleStockUpdates = (data: any, stocks: any[], setStocks: any, setStockData: any) => {
  const { s: stockSymbol, p: price } = data;

  setStocks((prev: { stock: any; value: number; }[]) =>
    prev.map((s: { stock: any; value: number; }) =>
      s.stock === stockSymbol
        ? { ...s, value: price, change: s.value ? ((price - s.value) / s.value) * 100 : 0 }
        : s
    )
  );

  setStockData((prev: { [x: string]: any; }) => {
    const updatedData = { ...prev, [stockSymbol]: [...(prev[stockSymbol] || []), price].slice(-10) };
    localStorage.setItem('stockData', JSON.stringify(updatedData));
    return updatedData;
  });

  const affectedStock = stocks.find((s) => s.stock === stockSymbol && price < s.alertPrice);
  affectedStock && sendNotification(stockSymbol, price);
};
