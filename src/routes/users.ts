import express, { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { FileModel } from '../models/file';
import { formatUsers } from '../utils/users';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const foundUsers = await UserModel.find({}).lean();
    res.send(formatUsers(foundUsers));
  } catch (e) {
    res.status(500).json({ message: 'Error querying users' });
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
        res.status(200).json({
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
