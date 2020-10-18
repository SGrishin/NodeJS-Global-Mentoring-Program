import { requestInfoLogger } from '../log';

export const loggerLoader = (app) => {
    app.use(requestInfoLogger);
};