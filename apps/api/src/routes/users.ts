import { ServerError as Error } from '@qwaroo/common';
import { Routes } from '@qwaroo/types';
import { Router } from 'express';
import { Users } from '#/handlers/Users';
import { useMe, useMustBeMe } from '#/middleware/useMe';
import { useMethods } from '#/middleware/useMethods';
import { useToken } from '#/middleware/useToken';
import { handle } from '#/utilities/routeHandler';

export default () => {
    const router = Router();

    router.all(
        Routes.users(),
        useMethods(['GET']),
        useToken([], ['GET']),
        handle(async (req, res) => {
            const opts: Record<string, unknown> = {};

            opts['term'] = String(req.query['term'] ?? '') || undefined;
            opts['limit'] = Number(req.query['limit'] ?? 0) || undefined;
            opts['skip'] = Number(req.query['skip'] ?? 0) || undefined;

            const ids = String(req.query['ids'] ?? '');
            if (ids) opts['ids'] = ids.split(',');

            const [data, items] = await Users.getUsers(opts);
            res.status(200).json({ success: true, ...data, items });
        })
    );

    router.all(
        Routes.user(':userId'),
        useMethods(['GET']),
        useToken([], ['GET']),
        useMe('userId'),
        handle(async (req, res) => {
            const user = await Users.getUser(req.params['userId']);
            res.status(200).json({ success: true, ...user.toJSON() });
        })
    );

    router.all(
        Routes.userConnections(':userId'),
        useMethods(['GET']),
        useToken([], ['GET']),
        useMe('userId'),
        useMustBeMe('userId', ['GET']),
        handle(async (req, res) => {
            const user = await Users.getUser(req.params['userId']);
            const connections = await user.getConnections();
            res.status(200).json({ success: true, items: connections });
        })
    );

    router.all(
        Routes.userConnection(':userId', ':connectionId'),
        useMethods(['GET']),
        useToken([], ['GET']),
        useMe('userId'),
        useMustBeMe('userId', ['GET']),
        handle(async (req, res) => {
            const user = await Users.getUser(req.params['userId']);
            const connectionId = String(req.params['connectionId'] ?? '');
            const connection = await user.getConnection(connectionId);
            if (!connection) throw new Error(404, 'Connection was not found');
            res.status(200).json({ success: true, ...connection.toJSON() });
        })
    );

    return router;
};
