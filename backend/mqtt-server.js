const awsIot = require('aws-iot-device-sdk');
const WebSocket = require('ws');
const http = require('http');

// AWS IoT MQTT client
const device = awsIot.device({
  keyPath: './certs/a79ab114f1fcb6d4a2564cb5389c00580db0fb3b1cab6a6d2c3cf858757ecd9e-private.pem.key',
  certPath: './certs/a79ab114f1fcb6d4a2564cb5389c00580db0fb3b1cab6a6d2c3cf858757ecd9e-certificate.pem.crt',
  caPath: './certs/AmazonRootCA1.pem',
  clientId: 'mqttRenderClient',
  host: 'a1cbpjn7brozwm-ats.iot.us-east-1.amazonaws.com'
});

let clients = [];

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log("WebSocket client connected");
  clients.push(ws);
});

device.on('connect', () => {
  console.log('Connected to AWS IoT');
  device.subscribe('your/topic'); // <--- replace this
});

device.on('message', (topic, payload) => {
  const msg = payload.toString();
  console.log(`Topic ${topic}: ${msg}`);
  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});