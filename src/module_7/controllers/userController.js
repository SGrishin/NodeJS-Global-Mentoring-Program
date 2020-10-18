import { userService } from '../services/userService';
import { logInfo } from '../log/logInfo';
import { logError } from '../log/logError';

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getAllUsers(req, res, next) {
        logInfo('UserController.getAllUsers');
        
        try {
            const users = await this.userService.getAllUsers();
            
            res.send(users);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.getAllUsers', });
        }
    }

    async createUser(req, res, next) {
        logInfo('UserController.createUser', [req.body]);

        try {
            const user = await this.userService.createUser(req.body);

            return res.send(user);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.createUser', params: [req.body] })
        }
    }

    async getUserById(req, res, next) {
        logInfo('UserController.getUserById', [req.params.userId]);

        try {
            const user = await this.userService.getUserById(req.params.userId);

            if (!user) {
                logError('UserController.getUserById', 404, [req.params.userId]);

                return res.status(404).json({ message: `User with id ${req.params.userId} was not found.` });
            }

            return res.json(user);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.getUserById', params: [req.params.userId] })
        }
    }

    async editUserById(req, res, next) {
        logInfo('UserController.editUserById', [req.params.userId, req.body]);

        try {
            const user = await this.userService.editUserById(req.params.userId, req.body);

            if (!user) {
                logError('UserController.editUserById', 404, [req.params.userId, req.body]);

                return res.status(404).json({ message: `User with id ${req.params.userId} was not found.` });
            }

            return res.json(user);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.editUserById', params: [req.params.userId, req.body] })
        }
    }

    async deleteUserById(req, res, next) {
        logInfo('UserController.deleteUserById', [req.params.userId]);

        try {
            const user = await this.userService.deleteUserById(req.params.userId);

            if (!user) {
                logError('UserController.deleteUserById', 404, [req.params.userId]);

                return res.status(404).json({ message: `User with id ${req.params.userId} was not found.` });
            }

            return res.json(user);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.deleteUserById', params: [req.params.userId] })
        }
    }

    async autoSuggestUsers(req, res, next) {
        const { searchText, limit } = req.body;
        
        logInfo('UserController.autoSuggestUsers', [searchText, limit]);

        try {
            const users = await this.userService.autoSuggestUsers(searchText, limit);

            return res.json(users);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'UserController.autoSuggestUsers', params: [searchText, limit] })
        }
    }
}

const userController = new UserController(userService);

export {
    UserController,
    userController,
}