const socket = new WebSocket('wss://ws.finnhub.io?token=ct7lr6hr01qkgg0uqem0ct7lr6hr01qkgg0uqemg');

// Subscribe to a stock symbol
export const subscribeToStock = (symbol: string) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'subscribe', symbol }));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ type: 'subscribe', symbol }));
    });
  }
};

// Unsubscribe from a stock symbol
export const unsubscribeFromStock = (symbol: string) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    });
  }
};

// Listen for incoming stock updates
export const listenToStockUpdates = (callback: (data: any) => void) => {
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    callback(message);
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
};
