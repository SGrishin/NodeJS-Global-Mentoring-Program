import { userFsResource } from '../resources/UserFsResource';

class UserService {
    constructor(userResource) {
        this.userResource = userResource;
    }

    getAllUsers() {
        return this.userResource.getAllUsers()
            .then((result) => result);
    }

    createUser(newUserData) {
        return this.userResource.createUser(newUserData)
            .then((result) => result);
    }

    getUserById(userId) {
        return this.userResource.getUserById(userId)
            .then((result) => result);
    }

    editUserById(userId, userUpdates) {
        return this.userResource.editUserById(userId, userUpdates)
            .then((result) => result);
    }

    deleteUserById(userId) {
        return this.userResource.deleteUserById(userId)
            .then((result) => result);
    }

    autoSuggestUsers(loginSubstring, limit) {
        return this.userResource.autoSuggestUsers(loginSubstring, limit)
            .then((result) => result);
    }
}

const userService = new UserService(userFsResource);

export {
    UserService,
    userService,
}