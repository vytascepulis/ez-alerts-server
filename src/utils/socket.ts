import { clients } from '../server';
import { SocketClient } from '../types';

const formatSocket = (client: SocketClient) => ({
  socketId: client[0],
});

export const getClientByUuid = (uuid: string) => {
  const arr = Array.from(clients);
  const client = arr.find((item) => {
    const uuidFromSocket = item[1].handshake.query.uuid;
    return uuid === uuidFromSocket;
  });

  if (client) {
    return formatSocket(client);
  }

  return null;
};
