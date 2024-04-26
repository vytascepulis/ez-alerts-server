import { IFile } from '../models/file';

const formatPutProducts = (products: IFile['products']) => {
  const newProducts = products.map((item) => ({
    id: item.id,
    url: item.url,
  }));

  return newProducts;
};

export { formatPutProducts };
