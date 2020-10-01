import { logger } from './logger';

export const logInfo = (methodName, params = []) => {
    const args = [].slice.call(params);

    logger.log({
        level: 'info',
        message: methodName + ' ' + JSON.stringify(args),
    });
};
