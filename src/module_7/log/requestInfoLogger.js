import { logger } from './logger';

export const requestInfoLogger = (req, res, next) => {
    const fotmattedBody = Object.keys(req.body).length ? ' ' + JSON.stringify(req.body) : '';
    const message = req.method + ' ' + req.url + fotmattedBody;

    logger.log({
        level: 'info',
        message: message,
    });

    next();
};