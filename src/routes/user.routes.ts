import { Router } from "express";
import { userController } from "../controllers/user.controller";


const userRouter = Router();

// userRouter.get('/', (req, res) => res.send("Hiii"));
userRouter.get('/', userController.getUsers);
userRouter.post('/', userController.saveAndGetUser);
userRouter.put('/:username', userController.update);



export default userRouter;