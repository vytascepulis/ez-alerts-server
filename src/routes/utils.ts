import express, { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { FileModel } from '../models/file';
const router = express.Router();

router.post('/purge', async (req: Request, res: Response) => {
  try {
    await UserModel.collection.drop();
    await FileModel.collection.drop();
    res.status(200).json({ message: 'Collections dropped' });
  } catch (e) {
    res.status(500).json({ message: 'Error dropping collection' });
  }
});

export default router;
