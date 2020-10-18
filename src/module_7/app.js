import express from 'express';
import { loaders } from './loaders';
import { runSequelize } from './db/Sequelize/initSequelize';
import { logger, uncaughtExceptionHandler, unhandledRejectionHandler } from './log';

require('dotenv').config();

const startServer = () => {
    const app = express();

    process.on('uncaughtException', uncaughtExceptionHandler);
    process.on('unhandledRejection', unhandledRejectionHandler);

    loaders(app);

    runSequelize();

    app.listen(process.env.PORT, () => {
        logger.info(`listening port ${process.env.PORT}`);
    });
};

startServer();
