import express from 'express';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Routes will go here
app.get('/', (req, res) => res.send("Good Job") );

export default app;
