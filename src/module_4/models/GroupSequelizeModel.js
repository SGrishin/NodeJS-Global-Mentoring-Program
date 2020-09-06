import Sequelize from 'sequelize';
import getUUID from '../../utils/getUUID';

const Op = Sequelize.Op;
const sequelize = new Sequelize({
    dialect: 'postgres',
    groupname: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'nodejs',
});

async function connectToDB() {
    try {
        await sequelize.authenticate();

        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectToDB();

sequelize.sync()
    .then((result) => {
        console.log('sync success');
    })
    .catch((error) => {
        console.log('sync error: ', error);
    });

const Group = sequelize.define('groups', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        permissions: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        },
        user_ids: {
            type: Sequelize.ARRAY(Sequelize.UUID),
            defaultValue: [],  
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: 'groups',
    });

class GroupSequelizeModel {
    constructor(Group) {
        this.Group = Group;
    }

    async getAllGroups() {
        try {
            const groups = this.Group.findAll();

            return groups;
        }
        catch (error) {
            return error;
        }
    }

    async createGroup(newGroupData) {
        try {
            const newGroup = await this.Group.create({ id: getUUID(), ...newGroupData });
    
            return newGroup;
        }
        catch (error) {
            return error;
        }
    }

    async getGroupById(groupId) {
        try {
            const group = await this.Group.findOne({
                where: {
                    id: groupId,
                }
            });

            return group;
        }
        catch (error) {
            return error;
        }
    }

    async editGroupById(groupId, { name, permissions, }) {
        try {
            const updatedGroup = await this.Group.update(
                { name, permissions, },
                {
                    returning: true,
                    where: {
                        id: groupId
                    }
                }
            );

            return updatedGroup[1];
        }
        catch (error) {
            return error;
        }
    }

    async deleteGroupById(groupId) {
        try {
            const group = await this.Group.findOne({
                where: {
                    id: groupId,
                }
            });

            return await group.destroy();
        }
        catch (error) {
            return error;
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
            return error;
        }
    }
}

const groupSequelizeModel = new GroupSequelizeModel(Group);

export {
    GroupSequelizeModel,
    groupSequelizeModel,
}