import { IUser } from '../models/user';
import { IFile } from '../models/file';
import { _Order } from '../types';
import { formatTestText, formatText } from './text';

const getImage = (
  settings?: IUser['settings'],
  products: IFile['products'] = [],
  productId?: number,
) => {
  const useProductImages = settings?.useProductImages;
  const image = settings?.image.base64;
  const boughtProductImage = products.find(
    (item) => item?.id === productId,
  )?.url;

  const finalImage =
    useProductImages && boughtProductImage ? boughtProductImage : image;

  return finalImage;
};

const formatAlertBody = (
  order: _Order,
  settings?: IUser['settings'],
  products: IFile['products'] = [],
) => {
  try {
    const text = settings?.text.content || '';
    const boughtProductId = order['line_items']?.[0]?.product_id;

    const finalImage = getImage(settings, products, boughtProductId);
    const finalText = formatText(text, order);

    return { image: finalImage, text: finalText };
  } catch (e) {
    throw new Error('Something went wrong while processing passed data!');
  }
};

const formatTestAlertBody = (settings?: IUser['settings']) => {
  try {
    const text = settings?.text.content || '';

    const finalImage = getImage(settings);
    const finalText = formatTestText(text);

    return { image: finalImage, text: finalText };
  } catch (e) {
    throw new Error('Something went wrong while processing passed data!');
  }
};

export { formatAlertBody, formatTestAlertBody };
