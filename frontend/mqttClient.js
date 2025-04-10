// Globals used to update lights, text, and time
const light = document.getElementById('light');
const statusText = document.getElementById('status-text');
const timestamp = document.getElementById('timestamp');

// Connection to socket
const socket = new WebSocket('wss://mqtt-backend-qagu.onrender.com');

// AWS -> Render -> Here
socket.onmessage = (event) => {
  try {
    // Parse data into what we want to display
    const data = JSON.parse(event.data);
    const status = data.status.toLowerCase();
    const time = new Date(data.timestamp).toLocaleTimeString();
    
    // Update the display
    light.className = 'light ' + status;
    statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    timestamp.textContent = 'Last updated: ' + time;

    // Redundant, this should never happen. Check data on render if this error is seen.
  } catch (e) {
    console.error('Error parsing data:', e);
    statusText.textContent = 'Error receiving data';
  }
};

// If there's a connection error with socket
socket.onerror = (err) => {
  statusText.textContent = 'Connection error';
  console.error('WebSocket error:', err);
};

// If socket closes
socket.onclose = () => {
  statusText.textContent = 'Disconnected';
};

// Attempt to reconnect
function setupWebSocket() {
  socket.onclose = () => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };
}