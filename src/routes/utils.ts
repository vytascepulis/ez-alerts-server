import express, { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { FileModel } from '../models/file';
const router = express.Router();

router.post('/purge', async (req: Request, res: Response) => {
  await UserModel.collection.drop();
  await FileModel.collection.drop();
  res.send('Collections dropped');
});

export default router;
