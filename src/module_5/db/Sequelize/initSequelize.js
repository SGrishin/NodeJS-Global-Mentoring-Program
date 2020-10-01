import Sequelize from 'sequelize';
import initModels from '../../models/ORM/initModels';

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'nodejs',
});

const [User, Group, UserGroup] = initModels(sequelize);

const defineRelations = () => {
    User.belongsToMany(Group, {
        through: UserGroup,
        // as: 'groups',
        foreignKey: 'userId',
        otherKey: 'groupId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Group.belongsToMany(User, {
        through: UserGroup,
        // as: 'users',
        foreignKey: 'groupId',
        otherKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    UserGroup.belongsTo(User, { foreignKey: 'userId' });
    UserGroup.belongsTo(Group, { foreignKey: 'groupId' });

    User.hasMany(UserGroup, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Group.hasMany(UserGroup, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

const runSequelize = () => {
    sequelize
        .authenticate()
        .then(async () => {
            defineRelations();
    
            await sequelize.sync({ force: true });     
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports = { sequelize, Op: Sequelize.Op, runSequelize, };