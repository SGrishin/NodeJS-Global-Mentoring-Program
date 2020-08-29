import { userSequelizeModel } from '../models/UserSequelizeModel';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    getAllUsers() {
        return this.userModel.getAllUsers()
            .then((result) => result);
    }

    createUser(newUserData) {
        return this.userModel.createUser(newUserData)
            .then((result) => result);
    }

    getUserById(userId) {
        return this.userModel.getUserById(userId)
            .then((result) => result);
    }

    editUserById(userId, userUpdates) {
        return this.userModel.editUserById(userId, userUpdates)
            .then((result) => result);
    }

    deleteUserById(userId) {
        return this.userModel.deleteUserById(userId)
            .then((result) => result);
    }

    autoSuggestUsers(loginSubstring, limit) {
        return this.userModel.autoSuggestUsers(loginSubstring, limit)
            .then((result) => result);
    }
}

const userService = new UserService(userSequelizeModel);

export {
    UserService,
    userService,
}