const awsIot = require('aws-iot-device-sdk');
const WebSocket = require('ws');
const http = require('http');

// Certification to connect to device, and endpoints
const device = awsIot.device({
  // Hidden names with real certification on render
  privateKey: Buffer.from(process.env.AWS_IOT_KEY.trim()),
  clientCert: Buffer.from(process.env.AWS_IOT_CERT.trim()),
  caCert: Buffer.from(process.env.AWS_IOT_CA.trim()),
  clientId: 'render-client-' + Math.random().toString(36).substring(2, 8),
  host: process.env.AWS_IOT_HOST.trim()
});

// WebSocket Server
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// On and off socket connection to front end
wss.on('connection', (ws) => {
  console.log("✅ WebSocket client connected");
  ws.on('close', () => console.log("❌ WebSocket client disconnected"));
});

// On connection to AWS
device.on('connect', () => {
  console.log('✅ Connected to AWS IoT');
  device.subscribe('car/status');
});

// If message from AWS
device.on('message', (topic, payload) => {
  const msg = payload.toString();
  console.log(`📩 ${topic}: ${msg}`);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
});

// If error from AWS
device.on('error', (error) => {
  console.error('⚠️ AWS IoT Error:', error);
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
});