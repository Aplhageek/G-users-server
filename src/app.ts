import express from 'express';
import cors from 'cors';
import routes from './routes';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import errorHandler from './middlewares/error.middleware';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Routes will go here
app.use('/', routes);


// To avoid unknown routes
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});


app.use(errorHandler);


export default app;
