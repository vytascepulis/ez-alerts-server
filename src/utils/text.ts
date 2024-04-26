import { _Order } from '../types';
import { currencyMap } from './currency';

const formatText = (text: string, order: _Order) => {
  // Available variables in alert text
  const price = order.line_items?.[0]?.price;
  const currency = order.currency;
  const customerName = order.shipping_address?.first_name;
  const productName = order.line_items?.[0]?.name;

  let formattedString = text;

  formattedString = formattedString.replaceAll(
    '{price}',
    `<special>${price}${currencyMap[currency || 'EUR']}</special>` || '',
  );

  formattedString = formattedString.replaceAll(
    '{customerName}',
    `<special>${customerName}</special>` || '',
  );

  formattedString = formattedString.replaceAll(
    '{productName}',
    `<special>${productName}</special>` || '',
  );

  return formattedString;
};

const formatTestText = (text: string) => {
  // Available variables in alert text
  const price = '19.50';
  const currency = 'EUR';
  const customerName = 'John Smith';
  const productName = 'Green T-shirt';

  let formattedString = text;

  formattedString = formattedString.replaceAll(
    '{price}',
    `<special>${price}${currencyMap[currency || 'EUR']}</special>` || '',
  );

  formattedString = formattedString.replaceAll(
    '{customerName}',
    `<special>${customerName}</special>` || '',
  );

  formattedString = formattedString.replaceAll(
    '{productName}',
    `<special>${productName}</special>` || '',
  );

  return formattedString;
};

export { formatText, formatTestText };
