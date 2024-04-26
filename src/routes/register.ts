import express, { Request, Response } from 'express';
import { checkUserExistance } from '../middleware/user';
import { createNewUser } from '../models/user';
import { createNewFile } from '../models/file';

const router = express.Router();

router.post('/:uuid/register', checkUserExistance, async (req: Request, res: Response) => {
  const newUser = createNewUser({
    uuid: req.params.uuid,
    shopDomain: 'www.shop.domain',
  });
  const newFile = createNewFile({ uuid: req.params.uuid });

  try {
    await newUser.save();
    await newFile.save();
    res.send(`${newUser.uuid} created`);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
