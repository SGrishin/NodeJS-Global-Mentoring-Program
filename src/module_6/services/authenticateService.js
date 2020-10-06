import { logInfo, logError } from '../log';

const admins = [{ userName: 'admin', password: 'admin', }];

class AuthenticateService {
    async login({ userName, password, }) {
        logInfo('AuthenticateService.login', arguments);

        try {
            const admin = admins.find((admin) => admin.userName === userName && admin.password === password);
    
            return users;
        }
        catch (error) {
            logError('AuthenticateService.login', 500, arguments);
            
            throw error;
        }
    }
}

const authenticateService = new AuthenticateService();

export {
    AuthenticateService,
    authenticateService,
}