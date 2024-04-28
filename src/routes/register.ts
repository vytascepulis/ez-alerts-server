import express, { Request, Response } from 'express';
import { checkUserExistance } from '../middleware/user';
import { createNewUser } from '../models/user';
import { createNewFile } from '../models/file';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface RegisterRequest<T> extends Request {
  body: T;
}

router.post(
  '/register',
  checkUserExistance,
  async (req: RegisterRequest<{ shopDomain: string }>, res: Response) => {
    const uuid = uuidv4();
    const newUser = createNewUser({
      uuid,
      shopDomain: req.body.shopDomain,
    });

    const newFile = createNewFile({ uuid });

    try {
      await newUser.save();
      await newFile.save();
      res
        .status(200)
        .json({ message: `${req.body.shopDomain} successfully created` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
);

export default router;
