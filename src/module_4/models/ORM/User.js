import { Model, DataTypes } from 'sequelize';

export default function (sequelize) {
    const { UUID, INTEGER, TEXT, BOOLEAN, } = DataTypes;

    class User extends Model {}

    User.init(
        {
            id: {
                type: UUID,
                primaryKey: true,
                allowNull: false,
            },
            login: {
                type: TEXT,
                allowNull: false,
            },
            password: {
                type: TEXT,
                allowNull: false,
            },
            age: {
                type: INTEGER,
                defaultValue: 4,
                allowNull: false,
            },
            is_deleted: {
                type: BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        },
        {
            modelName: 'users',
            sequelize
        }
    );

    User.beforeSync(() => console.log('Before creating users table'));
    User.afterSync(() => console.log('After creating users table'));

    return User;
}