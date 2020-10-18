import { Router } from 'express';
import { userController } from '../controllers/userController';
import { createUserValidator, editUserValidator, autoSuggestUsersValidator } from '../validators/userValidator';
import { checkToken } from '../token';

class UserRouter {
    constructor(router, userController) {
        this.router = router;
        this.userController = userController;

        this.setupRouter();
    }

    get userRouter() {
        return this.router;
    }

    setupRouter() {
        this.router.route('/')
            .get(checkToken, userController.getAllUsers.bind(this.userController));
        this.router.route('/create')
            .post(checkToken, createUserValidator, userController.createUser.bind(this.userController));
        this.router.route('/:userId')
            .get(checkToken, userController.getUserById.bind(this.userController))
            .put(checkToken, editUserValidator, userController.editUserById.bind(this.userController))
            .delete(checkToken, userController.deleteUserById.bind(this.userController));
        this.router.route('/auto-suggest')
            .post(checkToken, autoSuggestUsersValidator, userController.autoSuggestUsers.bind(this.userController));
    }
}

const userRouter = new UserRouter(Router(), userController).userRouter;

export {
    UserRouter,
    userRouter,
}