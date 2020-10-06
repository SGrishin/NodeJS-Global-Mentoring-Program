import { routerErrorLogger } from '../log';

export const routerErrorLoggerLoader = (app) => {
    app.use(routerErrorLogger);
};
