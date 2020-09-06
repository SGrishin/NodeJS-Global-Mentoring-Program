import { userService } from '../services/userService';

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getAllUsers(req, res, next) {
        return this.userService.getAllUsers()
            .then((allUsers) => res.send(allUsers))
            .catch((error) => console.error(error));
    }

    createUser(req, res, next) {
        return this.userService.createUser(req.body)
            .then((user) => res.send(user))
            .catch((error) => console.error(error));
    }

    getUserById(req, res, next) {
        return this.userService.getUserById(req.params.userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: `User with id ${req.params.userId} not found` });
                }
            
                res.json(user);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    editUserById(req, res, next) {
        return this.userService.editUserById(req.params.userId, req.body)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: `User with id ${req.params.userId} not found` });
                }
            
                res.json(user);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    deleteUserById(req, res, next) {
        return this.userService.deleteUserById(req.params.userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: `User with id ${req.params.userId} not found` });
                }
            
                res.json(user);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    autoSuggestUsers(req, res, next) {
        const { searchText, limit } = req.body;

        return this.userService.autoSuggestUsers(searchText, limit)
            .then((allUsers) => res.send(allUsers))
            .catch((error) => console.error(error));
    }
}

const userController = new UserController(userService);

export {
    UserController,
    userController,
}