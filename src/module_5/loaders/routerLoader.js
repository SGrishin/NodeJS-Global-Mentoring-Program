
import { API } from '../config';
import { apiRouter } from '../routes/apiRouter';

export const routerLoader = (app) => {
    app.use(API.PREFIX, apiRouter)
}