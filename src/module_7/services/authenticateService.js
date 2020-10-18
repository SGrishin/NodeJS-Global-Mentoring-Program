import { logInfo, logError } from '../log';
import getUUID from '../../utils/getUUID';

const admins = [{ id: getUUID(), username: 'admin', password: 'admin', }];

class AuthenticateService {
    async getAdmin({ username, password, }) {
        logInfo('AuthenticateService.getAdmin', arguments);

        try {
            const admin = admins.find((admin) => admin.username === username && admin.password === password);
    
            return admin;
        }
        catch (error) {
            logError('AuthenticateService.getAdmin', 500, arguments);
            
            throw error;
        }
    }
}

const authenticateService = new AuthenticateService();

export {
    AuthenticateService,
    authenticateService,
}