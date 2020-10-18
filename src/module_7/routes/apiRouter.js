import { Router } from 'express';
import { authenticateRouter } from './authenticateRouter';
import { userRouter } from './userRouter';
import { groupRouter } from './groupRouter';
import { userGroupRouter } from './userGroupRouter';

const routes = [
    { url: '/authenticate', router: authenticateRouter },
    { url: '/user', router: userRouter },
    { url: '/group', router: groupRouter },
    { url: '/link', router: userGroupRouter },
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