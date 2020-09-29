import { Router } from 'express';
import { userController } from '../controllers/userController';
import { createUserValidator, editUserValidator, autoSuggestUsersValidator } from '../validators/userValidator';

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
            .get(userController.getAllUsers.bind(this.userController));
        this.router.route('/create')
            .post(createUserValidator, userController.createUser.bind(this.userController));
        this.router.route('/:userId')
            .get(userController.getUserById.bind(this.userController))
            .put(editUserValidator, userController.editUserById.bind(this.userController))
            .delete(userController.deleteUserById.bind(this.userController));
        this.router.route('/auto-suggest')
            .post(autoSuggestUsersValidator, userController.autoSuggestUsers.bind(this.userController));
    }
}

const userRouter = new UserRouter(Router(), userController).userRouter;

export {
    UserRouter,
    userRouter,
}