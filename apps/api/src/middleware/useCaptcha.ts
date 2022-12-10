import process from 'node:process';
import { URLSearchParams } from 'node:url';
import { APIError } from '#/utilities/APIError';
import { handle } from '#/utilities/routeHandler';

export function useCaptcha(methods: string[]) {
    return handle(async (req, _, next) => {
        if (!methods.includes(req.method)) return next();

        const token = req.header('X-Captcha-Token');
        const remoteIp = req.header('X-Real-IP') ?? req.ip;

        if (!token) throw new APIError(401, 'No captcha token was provided');
        if (token === process.env['CAPTCHA_ALWAYS_PASS']) return next();

        const data = new URLSearchParams({
            secret: process.env['CAPTCHA_SECRET']!,
            response: token,
            remoteip: remoteIp!,
        });

        const url = process.env['CAPTCHA_SITE_VERIFY_URL']!;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data,
        });

        const json = await response.json();
        if (json.success) return next();
        else throw new APIError(400, 'Captcha verification failed');
    });
}