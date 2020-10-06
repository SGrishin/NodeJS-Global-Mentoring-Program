import { userGroupService } from '../services/userGroupService';
import { logInfo, logError } from '../log';

class UserGroupController {
    constructor(userGroupService) {
        this.userGroupService = userGroupService;
    }

    async getAllUserGroups(req, res, next) {
        logInfo('UserGroupController.getAllUserGroups');

        try {
            const userGroups = await this.userGroupService.getAllUserGroups();

            return res.send(userGroups);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserGroupController.getAllUserGroups', })
        }
    }

    async createUserGroup(req, res, next) {
        logInfo('UserGroupController.createUserGroup', [req.body]);

        try {
            const userGroup = await this.userGroupService.createUserGroup(req.body);

            return res.send(userGroup);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserGroupController.createUserGroup', params: [req.body]})
        }
    }

    async getUserGroupById(req, res, next) {
        logInfo('UserGroupController.getUserGroupById', [req.params.userGroupId]);

        try {
            const userGroup = await this.userGroupService.getUserGroupById(req.params.userGroupId);
            
            if (!userGroup) {
                logError('UserGroupController.getUserGroupById', 404, [req.params.userGroupId]);

                return res.status(404).json({ message: `UserGroup with id ${req.params.userGroupId} was not found.` });
            }

            return res.json(userGroup);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserGroupController.getUserGroupById', params: [req.params.userGroupId]})
        }
    }

    async deleteUserGroupById(req, res, next) {
        logInfo('UserGroupController.deleteUserGroupById', [req.params.userGroupId]);

        try {
            const userGroup = await this.userGroupService.deleteUserGroupById(req.params.userGroupId);
            
            if (!userGroup) {
                logError('UserGroupController.deleteUserGroupById', 404, [req.params.userGroupId]);

                return res.status(404).json({ message: `UserGroup with id ${req.params.userGroupId} was not found.` });
            }

            return res.json(userGroup);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserGroupController.deleteUserGroupById', params: [req.params.userGroupId]})
        }
    }
}

const userGroupController = new UserGroupController(userGroupService);

export {
    UserGroupController,
    userGroupController,
}