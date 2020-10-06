import { Router } from 'express';
import { userGroupController } from '../controllers/userGroupController';

class UserGroupRouter {
    constructor(router, userGroupController) {
        this.router = router;
        this.userGroupController = userGroupController;

        this.setupRouter();
    }

    get userGroupRouter() {
        return this.router;
    }

    setupRouter() {
        this.router.route('/')
            .get(userGroupController.getAllUserGroups.bind(this.userGroupController));
        this.router.route('/create')
            .post(userGroupController.createUserGroup.bind(this.userGroupController));
        this.router.route('/:userGroupId')
            .get(userGroupController.getUserGroupById.bind(this.userGroupController))
            .delete(userGroupController.deleteUserGroupById.bind(this.userGroupController));
    }
}

const userGroupRouter = new UserGroupRouter(Router(), userGroupController).userGroupRouter;

export {
    UserGroupRouter,
    userGroupRouter,
}