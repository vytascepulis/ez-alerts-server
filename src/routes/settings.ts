import express, { Request, Response } from 'express';
import { checkUserAvailability } from '../middleware/user';
import { IUser, UserModel } from '../models/user';
import {
    formatGetSettings,
    formatGetSettingsFull,
    formatPutSettings,
} from '../utils/settings';
import { clients, io } from '../server';

const router = express.Router();

type ISettings = IUser['settings'];

router.get(
    '/:uuid/settings',
    checkUserAvailability,
    async (req: Request, res: Response) => {
        const uuid = req.params.uuid;
        const foundUser = await UserModel.findOne({ uuid })
            .select('settings')
            .lean();

        if (foundUser) {
            res.json(formatGetSettings(foundUser.settings));
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
);

router.get(
    '/:uuid/settings-full',
    checkUserAvailability,
    async (req: Request, res: Response) => {
        const uuid = req.params.uuid;
        const foundUser = await UserModel.findOne({ uuid })
            .select('settings')
            .lean();

        if (foundUser) {
            res.json(formatGetSettingsFull(foundUser.settings));
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
);

router.put(
    '/:uuid/settings',
    checkUserAvailability,
    async (
        req: Request<{ uuid: string }, ISettings, ISettings>,
        res: Response,
    ) => {
        const uuid = req.params.uuid;
        const settings = req.body;

        try {
            const formattedSettings = formatPutSettings(settings);
            const foundUser = await UserModel.findOneAndUpdate(
                { uuid },
                { settings: formattedSettings },
            );

            if (foundUser) {
                const arr = Array.from(clients);
                const client = arr.find((item) => {
                    const uuidFromSocket = item[1].handshake.query.uuid;
                    return uuid === uuidFromSocket;
                });

                if (client) {
                    io.to(client[0]).emit(
                        'settings',
                        formattedSettings.display,
                        formattedSettings.text.specialColor,
                        formattedSettings.audio,
                    );

                    res.send('ok');
                } else {
                    res.status(500).send(`Couldn't find client ${uuid}`);
                }
            } else {
                res.status(500).send(`Could not update settings: ${foundUser}`);
            }
        } catch (e) {
            res.status(500).send('Passed body invalid');
        }
    },
);

export default router;
