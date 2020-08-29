import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const createUserSchema = Joi.object({
    login: Joi.string().required().email(),
    password: Joi.string().required().alphanum(),
    age: Joi.number().required().min(4).max(130),
});

export const createUserValidator = createValidator().body(
    createUserSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);

export const editUserSchema = Joi.object({
    login: Joi.string().email(),
    password: Joi.string().alphanum(),
    age: Joi.number().min(4).max(130),
});

export const editUserValidator = createValidator().body(
    editUserSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);

export const autoSuggestUsersSchema = Joi.object({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().required().min(2),
});

export const autoSuggestUsersValidator = createValidator().body(
    autoSuggestUsersSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);