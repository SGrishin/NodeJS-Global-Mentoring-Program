import { groupSequelizeModel } from '../models/GroupSequelizeModel';

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    getAllGroups() {
        return this.groupModel.getAllGroups()
            .then((result) => result);
    }

    createGroup(newGroupData) {
        return this.groupModel.createGroup(newGroupData)
            .then((result) => result);
    }

    getGroupById(groupId) {
        return this.groupModel.getGroupById(groupId)
            .then((result) => result);
    }

    editGroupById(groupId, groupUpdates) {
        return this.groupModel.editGroupById(groupId, groupUpdates)
            .then((result) => result);
    }

    deleteGroupById(groupId) {
        return this.groupModel.deleteGroupById(groupId)
            .then((result) => result);
    }

    autoSuggestGroups(searchText, limit) {
        return this.groupModel.autoSuggestGroups(searchText, limit)
            .then((result) => result);
    }
}

const groupService = new GroupService(groupSequelizeModel);

export {
    GroupService,
    groupService,
}