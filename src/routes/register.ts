import express, { Request, Response } from 'express';
import { checkUserExistance } from '../middleware/user';
import { createNewUser } from '../models/user';
import { createNewFile } from '../models/file';

const router = express.Router();

interface RegisterRequest<T> extends Request {
  body: T;
}

router.post(
  '/register',
  checkUserExistance,
  async (
    req: RegisterRequest<{ uuid: string; shopDomain: string }>,
    res: Response,
  ) => {
    const newUser = createNewUser({
      uuid: req.body.uuid,
      shopDomain: req.body.shopDomain,
    });

    const newFile = createNewFile({ uuid: req.params.uuid });

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
