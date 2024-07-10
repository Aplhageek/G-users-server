import { Router } from "express";
import { userController } from "../controllers/user.controller";


const userRouter = Router();

userRouter.get('/', (req, res) => res.send("Hiii"));
userRouter.post('/', userController.saveAndGetUser);


export default userRouter;