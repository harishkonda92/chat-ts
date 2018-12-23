import http from 'http';
import WebSocket, { Server } from 'ws';

export const attachWS = (server: http.Server) => {
    const wsClient = new Server({ server });
    wsClient.on('connection', (ws: WebSocket) => {
        ws.on('message', (message) => {
            wsClient.clients.forEach((client) => {
                client.send(message);
            });
        });
        ws.send('Hi there, I am a WebSocket server');
    });
};
