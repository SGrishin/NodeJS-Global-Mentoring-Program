import { Client } from 'pg';
import { PG_CONFIG_STRING } from '../config';

const pg = new Client(PG_CONFIG_STRING);

class UserPgModel {
    constructor(pg, conString) {
        this.pg = pg;
        this.conString = conString;

        this.pg.connect();
    }

    async getAllUsers() {
        const text = 'select * from users order by id';

        try {
            const query = await pg.query(text);
    
            return query.rows;
        }
        catch (error) {
            throw error;
        }
        finally {
        }
    }

    async createUser(newUserData) {
        const text = 'insert into users(login, password, age) VALUES($1, $2, $3) RETURNING *';
        const values = [
            newUserData.login,
            newUserData.password,
            newUserData.age,
        ];

        try {
            const query = await pg.query(text, values);
    
            return query.rows[0];
        }
        catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        const text = 'select * from users where id = $1';
        
        try {    
            const query = await pg.query(text, [userId]);
    
            return query.rows[0];
        }
        catch (error) {
            throw error;
        }
    }

    async editUserById(userId, userUpdates) {
        const getUserByIdText = 'select * from users where id = $1';
        const updateUserText = 'update users set login = $2, password = $3, age = $4 where id = $1 RETURNING *';
        
        try {    
            const oldUserQuery = await pg.query(getUserByIdText, [userId]);

            if (!oldUserQuery[0]) {
                return;
            }

            const editedUser = { ...oldUserQuery.rows[0], ...userUpdates };
            const values = [
                editedUser.id,
                editedUser.login,
                editedUser.password,
                editedUser.age,
            ];
    
            const newUserQuery = await pg.query(updateUserText, values);
    
            return newUserQuery.rows[0];
        }
        catch (error) {
            throw error;
        }
    }

    async deleteUserById(userId) {
        const getUserByIdText = 'select * from users where id = $1';
        const deleteUserText = 'update users set is_deleted = true where id = $1 RETURNING *';
        
        try {    
            const oldUserQuery = await pg.query(getUserByIdText, [userId]);

            if (!oldUserQuery.rows[0]) {
                return;
            }
    
            const newUserQuery = await pg.query(deleteUserText, [userId]);
    
            return newUserQuery.rows[0];
        }
        catch (error) {
            throw error;
        }
    }

    async autoSuggestUsers(searchText, limit) {
        const text = `select * from users where login like '${searchText}%' order by login limit ${limit}`;

        try {
            const query = await pg.query(text);
    
            return query.rows;
        }
        catch (error) {
            throw error;
        }
    }
}

const userPgModel = new UserPgModel(pg, PG_CONFIG_STRING);

export {
    UserPgModel,
    userPgModel,
}