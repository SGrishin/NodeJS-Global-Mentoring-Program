import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const createGroupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().required(),
});

export const createGroupValidator = createValidator().body(
    createGroupSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);

export const editGroupSchema = Joi.object({
    name: Joi.string(),
    permissions: Joi.array(),
});

export const editGroupValidator = createValidator().body(
    editGroupSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);

export const autoSuggestGroupsSchema = Joi.object({
    searchText: Joi.string().required(),
    limit: Joi.number().required().min(2),
});

export const autoSuggestGroupsValidator = createValidator().body(
    autoSuggestGroupsSchema,
    {
        joi: {
            allowUnknown: false,
        },
    }
);