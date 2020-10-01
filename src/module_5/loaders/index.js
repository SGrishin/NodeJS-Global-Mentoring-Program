import { json } from 'express';
import { loggerLoader } from './loggerLoader';
import { routerLoader } from './routerLoader';
import { routerErrorLoggerLoader } from './routerErrorLoggerLoader';

export const loaders = (app) => {
    app.use(json());
    
    loggerLoader(app);
    routerLoader(app);
    routerErrorLoggerLoader(app);
};