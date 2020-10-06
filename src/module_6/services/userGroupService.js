import { userGroupSequelizeModel } from '../models/UserGroupSequelizeModel';
import { logInfo, logError } from '../log';

class UserGroupService {
    constructor(userGroupModel) {
        this.userGroupModel = userGroupModel;
    }

    async getAllUserGroups() {
        logInfo('UserGroupService.getAllUserGroups', arguments);
        
        try {
            const userGroups = await this.userGroupModel.getAllUserGroups();

            return userGroups;
        }
        catch (error) {
            logError('GroupService.getAllGroups', 500, arguments);

            throw new Error(error);
        }
    }

    async createUserGroup(newUserGroupData) {
        logInfo('UserGroupService.createUserGroup', arguments);
        
        try {
            const userGroup = await this.userGroupModel.createUserGroup(newUserGroupData);

            return userGroup;
        }
        catch (error) {
            logError('GroupService.createUserGroup', 500, arguments);
            
            throw new Error(error);
        }
    }

    async getUserGroupById(userGroupId) {
        logInfo('UserGroupService.getUserGroupById', arguments);
        
        try {
            const userGroup = await this.userGroupModel.getUserGroupById(userGroupId);

            return userGroup;
        }
        catch (error) {
            logError('GroupService.getUserGroupById', 500, arguments);
            
            throw new Error(error);
        }
    }

    async deleteUserGroupById(userGroupId) {
        logInfo('UserGroupService.deleteUserGroupById', arguments);
        
        try {
            const result = await this.userGroupModel.deleteUserGroupById(userGroupId);

            return result;
        }
        catch (error) {
            logError('GroupService.deleteUserGroupById', 500, arguments);
            
            throw new Error(error);
        }
    }
}

const userGroupService = new UserGroupService(userGroupSequelizeModel);

export {
    UserGroupService,
    userGroupService,
}