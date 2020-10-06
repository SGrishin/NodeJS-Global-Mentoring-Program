import fs from 'fs';
import { FS_DATA_USERS_PATH } from '../config';
import getUUID from '../../utils/getUUID';

class UserFsModel {
    constructor(fs, path, idGenerator) {
        this.fs = fs;
        this.path = path;
        this.idGenerator = idGenerator;
    }

    getAllUsers() {

        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);

                resolve(users);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    createUser(newUserData) {
        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);
                const newUser = { id: this.idGenerator(), ...newUserData };

                users[newUser.id] = newUser;

                this.fs.writeFileSync(this.path, JSON.stringify(users));

                resolve(newUser);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);
                const user = users[userId];

                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    editUserById(userId, userUpdates) {
        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);
                const user = users[userId];

                if (!user) {
                    resolve();
                }

                const editedUser = { ...user, ...userUpdates };

                users[userId] = editedUser;

                this.fs.writeFileSync(this.path, JSON.stringify(users));

                resolve(editedUser);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    deleteUserById(userId) {
        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);
                const user = users[userId];

                if (!user) {
                    resolve();
                }

                const deletedUser = { ...user, isDeleted: true };

                users[userId] = deletedUser;

                this.fs.writeFileSync(this.path, JSON.stringify(users));

                resolve(deletedUser);
            }
            catch (error) {
                reject(error);
            }
        });
    }

    autoSuggestUsers(searchText, limit) {
        return new Promise((resolve, reject) => {
            try {
                const data = this.fs.readFileSync(this.path, 'utf8');
                const users = JSON.parse(data);
                const result = Object.keys(users).reduce((acc, currentUserId) => {
                    if (users[currentUserId].login.toLowerCase().startsWith(searchText.toLowerCase())) {
                        acc.push(users[currentUserId]);
                    }
            
                    return acc;
                }, []).slice(0, limit);

                resolve({
                    result,
                    total: result.length,
                    limit,
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}

const userFsModel = new UserFsModel(fs, FS_DATA_USERS_PATH, getUUID);

export {
    UserFsModel,
    userFsModel,
}