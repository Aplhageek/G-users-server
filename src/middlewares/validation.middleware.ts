import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

const validateSchemaBody = (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Validation error", error });
        } else {
            next();
        }
    };

const validateSchemaParams = (schema: Joi.ObjectSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.params);
        if (error) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Validation error", error });
        } else {
            next();
        }
    };

export { validateSchemaBody, validateSchemaParams };
