import { Router } from 'express';
import { authenticateController } from '../controllers/authenticateController';
import { authenticateValidator } from '../validators/authenticateValidator';

class AuthenticateRouter {
    constructor(router, authenticateController) {
        this.router = router;
        this.authenticateController = authenticateController;

        this.setupRouter();
    }

    get authenticateRouterRouter() {
        return this.router;
    }

    setupRouter() {
        this.router.route('/login')
            .post(authenticateValidator, authenticateController.login.bind(this.authenticateController));
    }
}

const authenticateRouter = new AuthenticateRouter(Router(), authenticateController).authenticateRouterRouter;

export {
    AuthenticateRouter,
    authenticateRouter,
}