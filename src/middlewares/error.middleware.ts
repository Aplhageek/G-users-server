import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../config/config';
import ApiError from '../utils/ApiError';

// Send response on errors
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === "development" && { stack: err.stack }),
    };

    if (config.env === "development") {
        console.error(err);
    }

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(response);
};

export default errorHandler;
