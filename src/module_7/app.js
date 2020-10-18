import express from 'express';
import { PORT } from './config';
import { loaders } from './loaders';
import { runSequelize } from './db/Sequelize/initSequelize';
import { logger, uncaughtExceptionHandler, unhandledRejectionHandler } from './log';

const startServer = () => {
    const app = express();

    process.on('uncaughtException', uncaughtExceptionHandler);
    process.on('unhandledRejection', unhandledRejectionHandler);

    loaders(app);

    runSequelize();

    app.listen(PORT, () => {
        logger.info(`listening port ${PORT}`);
    });
};

startServer();
