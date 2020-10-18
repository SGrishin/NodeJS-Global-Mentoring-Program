import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { logInfo, logError } from '../log';

export const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const params = req.method + ' ' + req.originalUrl;

    if (!token) {
        logError('checkToken', 403, [params], 'No token provided.');

        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) {
            logError('checkToken', 403, [params], 'Failed to authenticate token.');

            return res.status(401).send({ message: 'Failed to authenticate token.' });
        }

        logInfo('checkToken', [params]);

        next();
    });
};
