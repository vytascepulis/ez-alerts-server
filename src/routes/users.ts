import express, { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import { FileModel } from '../models/file';

const router = express.Router();

interface BlockRequest<T> extends Request {
  body: T;
}

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
      const deletedFiles = await FileModel.findOneAndDelete({ uuid });

      if (deletedUser && deletedFiles) {
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
  '/users/:uuid/block',
  async (
    req: Request<
      { uuid: string },
      { isBlocked: boolean },
      { isBlocked: boolean }
    >,
    res: Response,
  ) => {
    const uuid = req.params.uuid;
    const body = req.body;
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { uuid },
        {
          isBlocked: body.isBlocked,
        },
      );

      if (updatedUser) {
        res
          .status(200)
          .json({
            message: `User ${body.isBlocked ? 'blocked' : 'unblocked'}`,
          });
      } else {
        res.status(500).json({ message: 'Could not update user' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Error querying users' });
    }
  },
);

export default router;
