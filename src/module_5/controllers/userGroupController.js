import { userGroupService } from '../services/userGroupService';

class UserGroupController {
    constructor(userGroupService) {
        this.userGroupService = userGroupService;
    }

    getAllUserGroups(req, res, next) {
        return this.userGroupService.getAllUserGroups()
            .then((allUserGroups) => res.send(allUserGroups))
            .catch((error) => console.error(error));
    }

    createUserGroup(req, res, next) {
        return this.userGroupService.createUserGroup(req.body)
            .then((userGroup) => res.send(userGroup))
            .catch((error) => console.error(error));
    }

    getUserGroupById(req, res, next) {
        return this.userGroupService.getUserGroupById(req.params.userGroupId)
            .then((userGroup) => {
                if (!userGroup) {
                    return res.status(404).json({ message: `UserGroup with id ${req.params.userGroupId} not found` });
                }
            
                res.json(userGroup);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    deleteUserGroupById(req, res, next) {
        return this.userGroupService.deleteUserGroupById(req.params.userGroupId)
            .then((userGroup) => {
                if (!userGroup) {
                    return res.status(404).json({ message: `UserGroup with id ${req.params.userGroupId} not found` });
                }
            
                res.json(userGroup);
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

const userGroupController = new UserGroupController(userGroupService);

export {
    UserGroupController,
    userGroupController,
}