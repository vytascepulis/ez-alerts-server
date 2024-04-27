import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { ActiveClient } from './types';

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 3000;

let activeClients: ActiveClient[] = [];

io.on('connection', (socket) => {
  const uuidFromSocket = socket.handshake.query.uuid as string;
  console.log('Connected: ', uuidFromSocket);

  activeClients.push({
    uuid: uuidFromSocket,
    socketId: socket.id,
    client: socket,
  });

  socket.on('disconnect', () => {
    console.log('Disconnected: ', uuidFromSocket);

    activeClients = activeClients.filter(
      (client) => client.uuid !== uuidFromSocket,
    );
  });
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app, io, activeClients };
