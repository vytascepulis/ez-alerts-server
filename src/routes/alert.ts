import express, { Request, Response } from 'express';
import { checkUserAvailability } from '../middleware/user';
import { checkIsWebhookCorrect } from '../middleware/webhook';
import { UserModel } from '../models/user';
import { FileModel, IFile } from '../models/file';
import { _Order } from '../types';
import { formatAlertBody, formatTestAlertBody } from '../utils/alert';
import { io } from '../server';
import { getClientByUuid } from '../utils/socket';

const router = express.Router();

router.post(
    '/:uuid/alert',
    checkIsWebhookCorrect,
    checkUserAvailability,
    async (req: Request<{ uuid: string }, any, _Order>, res: Response) => {
        const uuid = req.params.uuid;

        try {
            const foundUser = await UserModel.findOne(
                { uuid },
                'settings',
            ).lean();

            let foundFile: IFile | null = null;

            if (foundUser?.settings.useProductImages) {
                foundFile = await FileModel.findOne(
                    { uuid },
                    'products',
                ).lean();
            }

            const formattedBody = formatAlertBody(
                req.body,
                foundUser?.settings,
                foundFile?.products,
            );

            const client = getClientByUuid(uuid);

            if (client) {
                io.to(client.socketId).emit(
                    'fire',
                    formattedBody.image,
                    formattedBody.text,
                );

                res.send('ok');
            } else {
                res.status(500).send('Error querying user and file');
            }
        } catch (e) {
            res.status(500).send('Error firing alert');
        }
    },
);

router.post(
    '/:uuid/test-alert',
    checkUserAvailability,
    async (req: Request<{ uuid: string }>, res: Response) => {
        const uuid = req.params.uuid;

        try {
            const foundUser = await UserModel.findOne(
                { uuid },
                'settings',
            ).lean();
            const formattedBody = formatTestAlertBody(foundUser?.settings);
            const client = getClientByUuid(uuid);

            if (client) {
                io.to(client.socketId).emit(
                    'fire',
                    formattedBody.image,
                    formattedBody.text,
                );

                res.json({ message: 'Test alert fired' });
            } else {
                res.status(500).json({
                    message: "Couldn't find socket client",
                });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error firing test alert' });
        }
    },
);

export default router;
