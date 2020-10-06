import { Router } from 'express';
import { groupController } from '../controllers/groupController';
import { createGroupValidator, editGroupValidator, autoSuggestGroupsValidator } from '../validators/groupValidator';

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
            .get(groupController.getAllGroups.bind(this.groupController));
        this.router.route('/create')
            .post(createGroupValidator, groupController.createGroup.bind(this.groupController));
        this.router.route('/:groupId')
            .get(groupController.getGroupById.bind(this.groupController))
            .put(editGroupValidator, groupController.editGroupById.bind(this.groupController))
            .delete(groupController.deleteGroupById.bind(this.groupController));
        this.router.route('/auto-suggest')
            .post(autoSuggestGroupsValidator, groupController.autoSuggestGroups.bind(this.groupController));
    }
}

const groupRouter = new GroupRouter(Router(), groupController).groupRouter;

export {
    GroupRouter,
    groupRouter,
}