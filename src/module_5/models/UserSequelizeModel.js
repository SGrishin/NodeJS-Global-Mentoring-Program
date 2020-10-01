import { sequelize, Op } from '../db/Sequelize/initSequelize';
import getUUID from '../../utils/getUUID';

class UserSequelizeModel {
    constructor(User, Group, sequelize) {
        this.User = User;
        this.Group = Group;
        this.sequelize = sequelize;
    }

    async getAllUsers() {
        try {
            const users = this.User.findAll();

            return users;
        }
        catch (error) {
            return error;
        }
    }
    
    async getUserById(userId) {
        try {
            const user = await this.User.findOne({
                include: [this.Group],
                where: {
                    id: userId,
                }
            });

            return user;
        }
        catch (error) {
            return error;
        }
    }

    async createUser(newUserData) {
        const t = await this.sequelize.transaction();

        try {
            const newUser = await this.User.create({ id: getUUID(), ...newUserData }, { transaction: t });

            await t.commit();
    
            return newUser;
        }
        catch (error) {
            await t.rollback();

            return error;
        }
    }

    async editUserById(userId, { login, password, age, }) {
        const t = await this.sequelize.transaction();

        try {
            const updatedUser = await this.User.update(
                { login, password, age, },
                {
                    returning: true,
                    where: {
                        id: userId
                    }
                },
                { transaction: t }
            );

            return updatedUser[1];
        }
        catch (error) {
            await t.rollback();

            return error;
        }
    }

    async deleteUserById(userId) {
        const t = await this.sequelize.transaction();

        try {
            const deletedUser = await this.User.update(
                { is_deleted: true, },
                {
                    returning: true,
                    where: {
                        id: userId
                    }
                },
                { transaction: t }
            );

            return deletedUser[1];
        }
        catch (error) {
            await t.rollback();
            
            return error;
        }
    }

    async autoSuggestUsers(searchText, limit) {
        try {
            const users = this.User.findAll({
                limit,
                where: {
                    login: {
                        [Op.like]: `%${searchText}%`,
                    },
                },
            });

            return users;
        }
        catch (error) {
            return error;
        }
    }
}

const userSequelizeModel = new UserSequelizeModel(sequelize.models.users, sequelize.models.groups, sequelize);

export {
    UserSequelizeModel,
    userSequelizeModel,
}