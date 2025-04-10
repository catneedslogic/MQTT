# AWS IoT MQTT Dashboard

A simple MQTT dashboard using AWS IoT Core, Node.js, WebSockets, and a static frontend.

## Structure

- `/backend` — Node.js WebSocket + MQTT bridge (deployed to Render)
- `/frontend` — Static site (deployed to Netlify)

## Setup

1. Setup variable names in render to macth your certifications for security
2. Edit the `host` and `topic` in `mqtt-server.js`
3. Update `mqttClient.js` with your Render backend URL
4. Update the Socket connections with the proper links