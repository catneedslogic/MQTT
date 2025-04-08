const light = document.getElementById('light');
const statusText = document.getElementById('status-text');
const timestamp = document.getElementById('timestamp');

const socket = new WebSocket('wss://mqtt-backend-qagu.onrender.com');

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    const status = data.status.toLowerCase();
    const time = new Date(data.timestamp).toLocaleTimeString();
    
    // Update the display
    light.className = 'light ' + status;
    statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    timestamp.textContent = 'Last updated: ' + time;
    
  } catch (e) {
    console.error('Error parsing data:', e);
    statusText.textContent = 'Error receiving data';
  }
};

socket.onerror = (err) => {
  statusText.textContent = 'Connection error';
  console.error('WebSocket error:', err);
};

socket.onclose = () => {
  statusText.textContent = 'Disconnected';
};