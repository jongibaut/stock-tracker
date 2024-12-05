
export const requestNotificationPermission = () =>
  Notification.permission === 'granted' || Notification.requestPermission();

export const sendNotification = (stock: string, price: number) =>
  Notification.permission === 'granted' &&
  navigator.serviceWorker?.ready.then((registration) =>
    registration.showNotification('Stock Alert', {
      body: `${stock} has dropped to $${price.toFixed(2)}.`,
      icon: '/icons/icon-192x192.png',
    })
  );
