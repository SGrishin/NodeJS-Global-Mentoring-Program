import { Router } from 'express';
import { groupController } from '../controllers/groupController';
import { createGroupValidator, editGroupValidator, autoSuggestGroupsValidator } from '../validators/groupValidator';
import { checkToken } from '../token';

class GroupRouter {
    constructor(router, groupController) {
        this.router = router;
        this.groupController = groupController;

        this.setupRouter();
    }

    get groupRouter() {
        return this.router;
    }

    setupRouter() {
        this.router.route('/')
            .get(checkToken, groupController.getAllGroups.bind(this.groupController));
        this.router.route('/create')
            .post(checkToken, createGroupValidator, groupController.createGroup.bind(this.groupController));
        this.router.route('/:groupId')
            .get(checkToken, groupController.getGroupById.bind(this.groupController))
            .put(checkToken, editGroupValidator, groupController.editGroupById.bind(this.groupController))
            .delete(checkToken, groupController.deleteGroupById.bind(this.groupController));
        this.router.route('/auto-suggest')
            .post(checkToken, autoSuggestGroupsValidator, groupController.autoSuggestGroups.bind(this.groupController));
    }
}

const groupRouter = new GroupRouter(Router(), groupController).groupRouter;

export {
    GroupRouter,
    groupRouter,
}