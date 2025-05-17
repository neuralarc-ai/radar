const ws = new WebSocket('wss://localhost:3001/ws');

ws.onopen = () => {
  console.log('WebSocket connected to local server');
  ws.send('Hello from frontend');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
