import { logger } from './logger';

export const routerErrorLogger = ({ error, code, params = [] }, res, next) => {
    const args = [].slice.call(params);

    logger.log({
        level: 'error',
        message: JSON.stringify({ status: error.status, code: code, message: error.message, method: method, params: args, }),
    });

    res.status(error.status).json({ status: error.status, code: code, message: error.message, });

    throw new Error(error)
};