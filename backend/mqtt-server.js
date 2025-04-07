const awsIot = require('aws-iot-device-sdk');
const WebSocket = require('ws');
const http = require('http');

// Read certs directly from environment variables
const device = awsIot.device({
  privateKey: process.env.AWS_IOT_KEY,    // Direct PEM string
  clientCert: process.env.AWS_IOT_CERT,   // Direct PEM string
  caCert: process.env.AWS_IOT_CA,         // Direct PEM string
  clientId: 'mqtt-client-' + Math.random().toString(36).substring(2, 8),
  host: process.env.AWS_IOT_HOST
});

// Rest of your code (WebSocket setup, etc.)
let clients = [];
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log("WebSocket client connected");
  clients.push(ws);
});

device.on('connect', () => {
  console.log('Connected to AWS IoT');
  device.subscribe('your/topic');
});

device.on('message', (topic, payload) => {
  const msg = payload.toString();
  clients.forEach(ws => ws.readyState === WebSocket.OPEN && ws.send(msg));
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});