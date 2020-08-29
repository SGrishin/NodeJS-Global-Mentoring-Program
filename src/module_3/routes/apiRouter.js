import { Router } from 'express';
import { userRouter } from './userRouter';

const routes = [
    { url: '/user', router: userRouter },
];

class ApiRouter {
    constructor(router, routes) {
        this.router = router;
        this.routes = routes;

        this.setupApiRoutes(routes);
    }

    get apiRouter() {
        return this.router;
    }

    addApiRoute(url, router) {
        this.router.use(url, router);
    }

    setupApiRoutes(routes) {
        routes.forEach((route) => {
            this.addApiRoute(route.url, route.router);
        });
    }
}

const apiRouter = new ApiRouter(Router(), routes).apiRouter;

export {
    ApiRouter,
    apiRouter,
};