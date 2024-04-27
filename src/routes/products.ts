import express, { Request, Response } from 'express';
import { checkUserAvailability } from '../middleware/user';
import { FileModel, IFile } from '../models/file';
import { formatPutProducts } from '../utils/products';

const router = express.Router();

type IProducts = IFile['products'];

router.put(
  '/:uuid/products',
  checkUserAvailability,
  async (
    req: Request<{ uuid: string }, IProducts, IProducts>,
    res: Response,
  ) => {
    const uuid = req.params.uuid;
    const products = req.body;
    try {
      const formattedProducts = formatPutProducts(products);
      const updatedFile = await FileModel.findOneAndUpdate(
        { uuid },
        { products: formattedProducts },
      );

      if (updatedFile) {
        res.send(formattedProducts);
      } else {
        res.status(500).send('Could not update user products');
      }
    } catch (e) {
      res.status(500).send('Passed body invalid');
    }
  },
);

export default router;
