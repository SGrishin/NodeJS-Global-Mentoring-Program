import { Model, DataTypes } from 'sequelize';
import { logger } from '../../log';

export default function (sequelize) {
    const { UUID, STRING, ARRAY, } = DataTypes;

    class Group extends Model {}

    Group.init(
        {
            id: {
                type: UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: STRING,
                allowNull: false,
            },
            permissions: {
                type: ARRAY(STRING),
                allowNull: false,
                validate: {
                    isIn: [['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']],
                },
            },
        },
        {
            modelName: 'groups',
            sequelize
        }
    );

    Group.beforeSync(() => logger.info('Before creating groups table'));
    Group.afterSync(() => logger.info('After creating groups table'));

    return Group;
}