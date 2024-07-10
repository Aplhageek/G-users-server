import Joi from "joi";


export const getUsersQuerySchema = Joi.object({
    username: Joi.string().allow('').optional(),
    name: Joi.string().allow('').optional(),
    location: Joi.string().allow('').optional(),
    sortBy: Joi.string().allow('').optional(),
});


export const usernameSchema = Joi.object({
    username: Joi.string().required().min(1),
});