import { NextFunction, Request, Response } from 'express';

const availableHooks = ['orders/paid'];

const checkIsWebhookCorrect = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const webhookTopic = req.headers['x-shopify-topic'] as string;
  const isAvailable = availableHooks.includes(webhookTopic);

  if (!isAvailable) {
    res.status(500).send('Incorrect hook passed!');
  } else {
    next();
  }
};

export { checkIsWebhookCorrect };
