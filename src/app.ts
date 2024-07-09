import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Routes will go here
app.use('/', routes);

export default app;
