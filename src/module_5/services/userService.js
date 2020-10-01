import { userSequelizeModel } from '../models/UserSequelizeModel';
import { logInfo, logError } from '../log';

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getAllUsers() {
        logInfo('UserService.getAllUsers', arguments);

        try {
            const users = await this.userModel.getAllUserss();
    
            return users;
        }
        catch (error) {
            logError('UserService.getAllUsers', 500, arguments);
            
            throw new Error(error);
        }
    }

    async createUser(newUserData) {
        logInfo('UserService.newUserData', arguments);

        try {
            const user = await this.userModel.createUser(newUserData);

            return user;
        }
        catch(error) {
            logError('UserService.newUserData', 500, arguments);
            
            throw new Error(error);
        }
    }

    async getUserById(userId) {
        logInfo('UserService.getUserById', arguments);

        try {
            const user = await this.userModel.getUserById(userId);

            return user;
        }
        catch(error) {
            logError('UserService.getUserById', 500, arguments);
            
            throw new Error(error);
        }
    }

    async editUserById(userId, userUpdates) {
        logInfo('UserService.editUserById', arguments);

        try {
            const user = await this.userModel.editUserById(userId, userUpdates);

            return user;
        }
        catch(error) {
            logError('UserService.editUserById', 500, arguments);
            
            throw new Error(error);
        }
    }

    async deleteUserById(userId) {
        logInfo('UserService.deleteUserById', arguments);

        try {
            const user = await this.userModel.deleteUserById(userId);

            return user;
        }
        catch(error) {
            logError('UserService.deleteUserById', 500, arguments);
            
            throw new Error(error);
        }
    }

    async autoSuggestUsers(searchText, limit) {
        logInfo('UserService.autoSuggestUsers', arguments);

        try {
            const users = await this.userModel.autoSuggestUsers(searchText, limit);

            return users;
        }
        catch(error) {
            logError('UserService.autoSuggestUsers', 500, arguments);
            
            throw new Error(error);
        }
    }
}

const userService = new UserService(userSequelizeModel);

export {
    UserService,
    userService,
}