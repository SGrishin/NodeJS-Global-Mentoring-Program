import { logger } from './logger';

export const logError = (methodName, code, params, message) => {
    const resultMessage = [methodName, code];

    if (message) {
        resultMessage.push(message);
    }
    
    if (params) {
        const args = [].slice.call(params);

        resultMessage.push(JSON.stringify(args));
    }

    logger.log({
        level: 'error',
        message: resultMessage.join(' '),
    });
};