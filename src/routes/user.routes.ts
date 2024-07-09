import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send("GET users Working fine"));


export default userRouter;