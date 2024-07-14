import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

const validateSchemaBody = (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Validation error", errors: errorDetails });
        }
        req.body = value; // Pass validated data
        next();
    };

const validateSchemaParams = (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.params, { abortEarly: false, allowUnknown: true });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Validation error", errors: errorDetails });
        }
        req.params = value; // Pass validated data
        next();
    };

const validateSchemaQuery = (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.query, { abortEarly: false, allowUnknown: true });
        if (error) {
            const errorDetails = error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Validation error", errors: errorDetails });
        }
        req.query = value; // Pass validated data
        next();
    };

export { validateSchemaBody, validateSchemaParams, validateSchemaQuery };
