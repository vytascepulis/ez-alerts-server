import express, { Request, Response } from 'express';
import { checkUserAvailability } from '../middleware/user';
import { IUser, UserModel } from '../models/user';
import { formatGetSettings, formatSettings } from '../utils/settings';
import { activeClients, io } from '../server';

const router = express.Router();

type ISettings = IUser['settings'];

router.get(
  '/settings/:uuid',
  checkUserAvailability,
  async (req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const foundUser = await UserModel.findOne({ uuid })
      .select('settings')
      .lean();

    if (foundUser) {
      res.json(formatGetSettings(foundUser.settings));
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

router.put(
  '/settings/:uuid',
  checkUserAvailability,
  async (
    req: Request<{ uuid: string }, ISettings, ISettings>,
    res: Response,
  ) => {
    const uuid = req.params.uuid;
    const settings = req.body;

    try {
      const formattedSettings = formatSettings(settings);
      const foundUser = await UserModel.findOneAndUpdate(
        { uuid },
        { settings: formattedSettings },
      );

      if (foundUser) {
        const socketId = activeClients.find(
          (client) => client.uuid === uuid,
        )?.socketId;

        if (socketId) {
          io.to(socketId).emit(
            'settings',
            formattedSettings.display,
            formattedSettings.text.specialColor,
            formattedSettings.audio,
          );
        }

        res.status(200).json({ message: 'User settings updated successfully' });
      } else {
        res
          .status(500)
          .json({ message: `Could not update settings: ${foundUser}` });
      }
    } catch (e) {
      res.status(500).json({ message: 'Passed body invalid' });
    }
  },
);

export default router;
