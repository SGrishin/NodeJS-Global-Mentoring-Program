import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const authenticateSchema = Joi.object({
    username: Joi.string().required().alphanum(),
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
