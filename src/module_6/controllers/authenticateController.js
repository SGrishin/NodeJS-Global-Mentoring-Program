import { authenticateService } from '../services/authenticateService';
import { logInfo } from '../log';

class AuthenticateController {
    constructor(authenticateService) {
        this.authenticateService = authenticateService;
    }

    async login(req, res, next) {
        logInfo('AuthenticateController.login');

        try {
            const token = await this.authenticateService.login(req.body);

            return res.status(200).json(token);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'AuthenticateController.login', })
        }
    }
}

const authenticateController = new AuthenticateController(authenticateService);

export {
    AuthenticateController,
    authenticateController,
}