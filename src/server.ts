import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  const uuidFromSocket = socket.handshake.query.uuid;
  console.log('connected: ', socket.id, uuidFromSocket);
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const clients = io.sockets.sockets;

export { app, io, clients };
