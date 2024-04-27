import { IUser } from '../models/user';
import { activeClients } from '../server';

const isActive = (uuid: string) => {
  return Boolean(activeClients.find((client) => client.uuid === uuid));
};

export const formatUsers = (users: IUser[]) => {
  return users.map((user: IUser) => {
    return {
      ...user,
      isActive: isActive(user.uuid),
    };
  });
};
