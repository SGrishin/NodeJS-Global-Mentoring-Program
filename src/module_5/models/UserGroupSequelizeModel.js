import { sequelize, Op } from '../db/Sequelize/initSequelize';
import getUUID from '../../utils/getUUID';

class UserGroupSequelizeModel {
    constructor(User, Group, UserGroup, sequelize) {
        this.User = User;
        this.Group = Group;
        this.UserGroup = UserGroup;
        this.sequelize = sequelize;
    }

    async getAllUserGroups() {
        try {
            const userGroups = this.UserGroup.findAll();

            return userGroups;
        }
        catch (error) {
            return error;
        }
    }

    async createUserGroup(newUserGroupData) {
        const t = await sequelize.transaction();

        try {
            const newUserGroup = await this.UserGroup.create({ id: getUUID(), ...newUserGroupData }, { transaction: t });

            await t.commit();
    
            return newUserGroup;
        }
        catch (error) {
            await t.rollback();

            return error;
        }
    }

    async getUserGroupById(userGroupId) {
        try {
            const userGroup = await this.UserGroup.findOne({
                include: [this.User, this.Group],
                where: {
                    id: userGroupId,
                }
            });

            return userGroup;
        }
        catch (error) {
            return error;
        }
    }

    async deleteUserGroupById(userGroupId) {
        const t = await sequelize.transaction();

        try {
            const userGroup = await this.UserGroup.findOne({
                where: {
                    id: userGroupId,
                }
            });

            const result = await userGroup.destroy({ transaction: t });

            await t.commit();

            return result;
        }
        catch (error) {
            await t.rollback();

            return error;
        }
    }
}

const userGroupSequelizeModel = new UserGroupSequelizeModel(sequelize.models.users, sequelize.models.groups, sequelize.models.user_groups, sequelize);

export {
    UserGroupSequelizeModel,
    userGroupSequelizeModel,
}