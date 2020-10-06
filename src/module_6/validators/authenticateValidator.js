import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const authenticateSchema = Joi.object({
    login: Joi.string().required().email(),
    password: Joi.string().required().alphanum(),
});

export const authenticateValidator = createValidator().body(
    authenticateSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);
