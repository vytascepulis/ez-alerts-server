import { IUser } from '../models/user';
import { activeClients } from '../server';

const isActive = (uuid: string) => {
  return Boolean(activeClients.find((client) => client.uuid === uuid));
};

export const formatUsers = (users: IUser[]) => {
  return users.map((user: IUser) => {
    const activeSockets = activeClients
      .filter((client) => client.uuid === user.uuid)
      .map((client) => client.socketId);

    return {
      ...user,
      isActive: isActive(user.uuid),
      activeClients: activeSockets,
    };
  });
};
