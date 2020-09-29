import { Model, DataTypes } from 'sequelize';

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

    Group.beforeSync(() => console.log('Before creating groups table'));
    Group.afterSync(() => console.log('After creating groups table'));

    return Group;
}