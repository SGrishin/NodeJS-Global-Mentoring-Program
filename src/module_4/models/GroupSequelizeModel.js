import { sequelize, Op } from '../db/Sequelize/initSequelize';
import getUUID from '../../utils/getUUID';

class GroupSequelizeModel {
    constructor(Group, User, sequelize) {
        this.Group = Group;
        this.User = User;
        this.sequelize = sequelize;
    }

    async getAllGroups() {
        try {
            const groups = this.Group.findAll();

            console.log('groups: ', groups);

            return groups;
        }
        catch (error) {
            throw error;
        }
    }

    async createGroup(newGroupData) {
        const t = await sequelize.transaction();

        try {
            const newGroup = await this.Group.create({ id: getUUID(), ...newGroupData }, { transaction: t });

            await t.commit();
    
            return newGroup;
        }
        catch (error) {
            await t.rollback();

            throw error;
        }
    }

    async getGroupById(groupId) {
        try {
            const group = await this.Group.findOne({
                include: [this.User],
                where: {
                    id: groupId,
                }
            });

            return group;
        }
        catch (error) {
            throw error;
        }
    }

    async editGroupById(groupId, { name, permissions, }) {
        const t = await sequelize.transaction();

        try {
            const updatedGroup = await this.Group.update(
                { name, permissions, },
                {
                    returning: true,
                    where: {
                        id: groupId
                    }
                },
                { transaction: t }
            );

            await t.commit();

            return updatedGroup[1];
        }
        catch (error) {
            await t.rollback();

            throw error;
        }
    }

    async deleteGroupById(groupId) {
        const t = await sequelize.transaction();
        
        try {
            const group = await this.Group.findOne({
                where: {
                    id: groupId,
                }
            });

            const result = await group.destroy({ transaction: t });

            await t.commit();

            return result;
        }
        catch (error) {
            await t.rollback();
            
            throw error;
        }
    }

    async autoSuggestGroups(searchText, limit) {
        try {
            const groups = this.Group.findAll({
                limit,
                where: {
                    name: {
                        [Op.like]: `%${searchText}%`,
                    },
                },
            });

            return groups;
        }
        catch (error) {
            throw error;
        }
    }
}

const groupSequelizeModel = new GroupSequelizeModel(sequelize.models.groups, sequelize.models.users, sequelize);

export {
    GroupSequelizeModel,
    groupSequelizeModel,
}