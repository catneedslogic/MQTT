const awsIot = require('aws-iot-device-sdk');
const WebSocket = require('ws');
const http = require('http');

// ===== COPY-PASTE READY CONFIG =====
const device = awsIot.device({
  privateKey: Buffer.from(process.env.AWS_IOT_KEY.trim()),
  clientCert: Buffer.from(process.env.AWS_IOT_CERT.trim()),
  caCert: Buffer.from(process.env.AWS_IOT_CA.trim()),
  clientId: 'render-client-' + Math.random().toString(36).substring(2, 8),
  host: process.env.AWS_IOT_HOST.trim()
});

// WebSocket Server
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log("WebSocket client connected");
  ws.on('close', () => console.log("Client disconnected"));
});

// AWS IoT Events
device.on('connect', () => {
  console.log('✅ Connected to AWS IoT');
  device.subscribe('your/topic'); // Replace with your topic
});

device.on('message', (topic, payload) => {
  const msg = payload.toString();
  console.log(`📩 ${topic}: ${msg}`);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
});