import { Model, DataTypes } from 'sequelize';

export default function (sequelize) {
    const { UUID, } = DataTypes;

    class UserGroup extends Model {}

    UserGroup.init(
        {
            id: {
                type: UUID,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            modelName: 'user_groups',
            sequelize
        }
    );

    UserGroup.beforeSync(() => logger.log({ level: 'info', message: 'Before creating user_groups table' }));
    UserGroup.afterSync(() => logger.log({ level: 'info', message: 'After creating user_groups table' }));

    return UserGroup;
}