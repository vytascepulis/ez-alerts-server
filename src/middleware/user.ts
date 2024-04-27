import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';

const checkUserExistance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = req.params.uuid;
  const exists = Boolean(await UserModel.exists({ uuid }));
  if (exists) {
    res.status(500).send('Uuid already exists!');
  } else {
    next();
  }
};

const checkUserAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = req.params.uuid;
  const foundUser = await UserModel.findOne({ uuid })
    .select('isBlocked')
    .lean();

  if (!foundUser) {
    res.status(404).json({ message: 'User not found!' });
  } else if (foundUser.isBlocked) {
    res.status(500).json({ message: 'User is blocked!' });
  } else {
    next();
  }
};

export { checkUserExistance, checkUserAvailability };
