import express, { Request, Response } from 'express';
import { activeClients } from '../server';

const router = express.Router();

router.get('/dashboard', (req: Request, res: Response) => {
  res.status(200).json({
    activeClients: activeClients.map((client) => ({
      uuid: client.uuid,
      socketId: client.socketId,
    })),
  });
});

export default router;
