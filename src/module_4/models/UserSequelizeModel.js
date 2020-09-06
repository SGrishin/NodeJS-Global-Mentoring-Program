import Sequelize from 'sequelize';

const Op = Sequelize.Op;
const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
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

const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        login: {
            type: Sequelize.CHAR(50),
            allowNull: false,
        },
        password: {
            type: Sequelize.CHAR(50),
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
            defaultValue: 4,
            allowNull: false,
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'users',
    });

class UserSequelizeModel {
    constructor(User) {
        this.User = User;
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

    async createUser(newUserData) {
        try {
            const newUser = await this.User.create(newUserData);
    
            return newUser;
        }
        catch (error) {
            return error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.User.findOne({
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

    async editUserById(userId, { login, password, age, }) {
        try {
            const updatedUser = await this.User.update(
                { login, password, age, },
                {
                    returning: true,
                    where: {
                        id: userId
                    }
                }
            );

            return updatedUser[1];
        }
        catch (error) {
            return error;
        }
    }

    async deleteUserById(userId) {
        try {
            const deletedUser = await this.User.update(
                { is_deleted: true, },
                {
                    returning: true,
                    where: {
                        id: userId
                    }
                }
            );

            return deletedUser[1];
        }
        catch (error) {
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

const userSequelizeModel = new UserSequelizeModel(User);

export {
    UserSequelizeModel,
    userSequelizeModel,
}