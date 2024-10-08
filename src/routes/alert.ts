import express, { Request, Response } from 'express';
import { checkUserAvailability } from '../middleware/user';
import { checkIsWebhookCorrect } from '../middleware/webhook';
import { UserModel } from '../models/user';
import { FileModel, IFile } from '../models/file';
import { _Order } from '../types';
import { formatAlertBody, formatTestAlertBody } from '../utils/alert';
import { activeClients, io } from '../server';

const router = express.Router();

router.post(
  '/alert/:uuid',
  checkIsWebhookCorrect,
  checkUserAvailability,
  async (req: Request<{ uuid: string }, _Order, _Order>, res: Response) => {
    const uuid = req.params.uuid;

    try {
      const foundUser = await UserModel.findOne({ uuid }, 'settings').lean();

      let foundFile: IFile | null = null;

      if (foundUser?.settings.useProductImages) {
        foundFile = await FileModel.findOne({ uuid }, 'products').lean();
      }

      const formattedBody = formatAlertBody(
        req.body,
        foundUser?.settings,
        foundFile?.products,
      );

      const socketId = activeClients.find(
        (client) => client.uuid === uuid,
      )?.socketId;

      if (socketId) {
        io.to(socketId).emit('fire', formattedBody.image, formattedBody.text);

        res.status(200).json({ message: 'Alert fired successfully' });
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Error firing alert' });
    }
  },
);

router.post(
  '/test-alert/:uuid',
  checkUserAvailability,
  async (req: Request<{ uuid: string }>, res: Response) => {
    const uuid = req.params.uuid;

    try {
      const foundUser = await UserModel.findOne({ uuid }, 'settings').lean();
      const formattedBody = formatTestAlertBody(foundUser?.settings);
      const socketIds = activeClients
        .filter((client) => client.uuid === uuid)
        .map((client) => client.socketId);

      if (socketIds.length) {
        io.to(socketIds).emit('fire', formattedBody.image, formattedBody.text);

        res.status(200).json({ message: 'Test alert fired successfully' });
      } else {
        res.status(404).json({
          message: 'Client not found',
        });
      }
    } catch (e) {
      res.status(500).json({ message: 'Error firing test alert' });
    }
  },
);

export default router;
