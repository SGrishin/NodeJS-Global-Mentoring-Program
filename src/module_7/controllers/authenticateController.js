import jwt from 'jsonwebtoken';
import { authenticateService } from '../services/authenticateService';
import { logInfo } from '../log';
import { SECRET, TOKEN_EXPIRATION_TIME, } from '../config';

class AuthenticateController {
    constructor(authenticateService) {
        this.authenticateService = authenticateService;
    }

    async login(req, res, next) {
        logInfo('AuthenticateController.login');

        try {
            const admin = await this.authenticateService.getAdmin(req.body);

            if (!admin) {
                logError('AuthenticateController.login', 404, [req.body.username, req.body.password]);

                return res.status(404).json({ message: `User was not found.` });
            }

            const token = jwt.sign({ sub: admin.id }, SECRET, {
                expiresIn: TOKEN_EXPIRATION_TIME
            });

            return res.send(token);
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