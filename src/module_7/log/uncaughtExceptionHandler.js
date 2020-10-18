import { logger } from './logger';

export const uncaughtExceptionHandler = (error) => {
    const message = 'Uncaught Exception ' + JSON.stringify(error);
    
    logger.log({
        level: 'error',
        message: message,
    });

    process.exit(1);
};