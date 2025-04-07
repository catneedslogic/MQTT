// Change this to your Render backend WebSocket URL
const socket = new WebSocket('wss://mqtt-backend.onrender.com');

socket.onmessage = (event) => {
  document.getElementById('data').innerText = event.data;
};

socket.onopen = () => console.log("WebSocket connected");
socket.onerror = (err) => console.error("WebSocket error:", err);