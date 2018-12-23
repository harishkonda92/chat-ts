import express from 'express';
import http from 'http';
import { serveFiles } from './serveFiles';
import { attachWS } from './websocket';

const app = express();

const server = http.createServer(app);

attachWS(server);
serveFiles(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server is started at ${port}`);
});
