import { groupSequelizeModel } from '../models/GroupSequelizeModel';
import { logInfo, logError } from '../log';

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async getAllGroups() {
        logInfo('GroupService.getAllGroups', arguments);

        try {
            const groups = await this.groupModel.getAllGroups();

            return groups;
        }
        catch (error) {
            logError('GroupService.getAllGroups', 500, arguments);
            
            throw error;
        }
    }

    async createGroup(newGroupData) {
        logInfo('GroupService.createGroup', arguments);

        try {
            const group = await this.groupModel.createGroup(newGroupData);

            return group;
        }
        catch (error) {
            logError('GroupService.createGroup', 500, arguments);
            
            throw error;
        }
    }

    async getGroupById(groupId) {
        logInfo('GroupService.getGroupById', arguments);
        
        try {
            const group = await this.groupModel.getGroupById(groupId);

            return group;
        }
        catch (error) {
            logError('GroupService.getGroupById', 500, arguments);
            
            throw error;
        }
    }

    async editGroupById(groupId, groupUpdates) {
        logInfo('GroupService.editGroupById', arguments);

        try {
            const group = await this.groupModel.editGroupById(groupId, groupUpdates);

            return group;
        }
        catch (error) {
            logError('GroupService.editGroupById', 500, arguments);
            
            throw error;
        }
    }

    async deleteGroupById(groupId) {
        logInfo('GroupService.deleteGroupById', arguments);

        try {
            const result = await this.groupModel.deleteGroupById(groupId);

            return result;
        }
        catch (error) {
            logError('GroupService.deleteGroupById', 500, arguments);
            
            throw error;
        }
    }

    async autoSuggestGroups(searchText, limit) {
        logInfo('GroupService.autoSuggestGroups', arguments);

        try {
            const result = await this.groupModel.autoSuggestGroups(searchText, limit);

            return result;
        }
        catch (error) {
            logError('GroupService.autoSuggestGroups', 500, arguments);
            
            throw error;
        }
    }
}

const groupService = new GroupService(groupSequelizeModel);

export {
    GroupService,
    groupService,
}