import express, { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const foundUsers = await UserModel.find({});
    res.send(foundUsers);
  } catch (e) {
    res.status(500).send('Error querying users');
  }
});

router.delete(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response) => {
    const uuid = req.params.uuid;

    try {
      const deletedUser = await UserModel.findOneAndDelete({ uuid });

      if (deletedUser) {
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(500).json({ message: 'Could not delete user' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Error querying users' });
    }
  },
);

router.post(
  '/users/:uuid',
  async (req: Request<{ uuid: string }, IUser, IUser>, res: Response) => {
    const uuid = req.params.uuid;
    const body = req.body;
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { uuid },
        {
          isBlocked: body.isBlocked,
          settings: {
            text: {
              content: body.settings.text.content,
              specialColor: body.settings.text.specialColor,
            },
            display: {
              duration: body.settings.display.duration,
              animationIn: body.settings.display.animationIn,
              animationOut: body.settings.display.animationOut,
            },
            audio: {
              volume: body.settings.audio.volume,
              base64: body.settings.audio.base64,
            },
            image: {
              base64: body.settings.image.base64,
            },
            useProductImages: body.settings.useProductImages,
          },
        },
      );

      if (updatedUser) {
        res.status(200).json({ message: 'User updated' });
      } else {
        res.status(500).json({ message: 'Could not update user' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Error querying users' });
    }
  },
);

export default router;
