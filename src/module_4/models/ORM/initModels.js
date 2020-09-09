import initUser from './User';
import initGroup from './Group';
import initUserGroup from './UserGroup';

export default function (sequelize) {
    const modelDefiners = [
        initUser,
        initGroup,
        initUserGroup,
    ];
    let models = [];

    for (const modelDefiner of modelDefiners) {
        models.push(modelDefiner(sequelize));        
    }

    return models;
}