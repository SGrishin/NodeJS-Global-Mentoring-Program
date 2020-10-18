import { json } from 'express';
import cors from 'cors';
import { loggerLoader } from './loggerLoader';
import { routerLoader } from './routerLoader';
import { routerErrorLoggerLoader } from './routerErrorLoggerLoader';

export const loaders = (app) => {
    app.use(cors());
    app.use(json());
    
    loggerLoader(app);
    routerLoader(app);
    routerErrorLoggerLoader(app);
};