import { userGroupSequelizeModel } from '../models/UserGroupSequelizeModel';

class UserGroupService {
    constructor(userGroupModel) {
        this.userGroupModel = userGroupModel;
    }

    getAllUserGroups() {
        return this.userGroupModel.getAllUserGroups()
            .then((result) => result);
    }

    createUserGroup(newUserGroupData) {
        return this.userGroupModel.createUserGroup(newUserGroupData)
            .then((result) => result);
    }

    getUserGroupById(userGroupId) {
        return this.userGroupModel.getUserGroupById(userGroupId)
            .then((result) => result);
    }

    deleteUserGroupById(userGroupId) {
        return this.userGroupModel.deleteUserGroupById(userGroupId)
            .then((result) => result);
    }
}

const userGroupService = new UserGroupService(userGroupSequelizeModel);

export {
    UserGroupService,
    userGroupService,
}