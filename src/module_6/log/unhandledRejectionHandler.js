import { logger } from './logger';

export const unhandledRejectionHandler = (error) => {
    const message = 'Unhandled Rejection ' + JSON.stringify(error);
    
    logger.log({
        level: 'error',
        message: message,
    });

    process.exit(1);
};