import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validateSchemaBody, validateSchemaParams } from "../middlewares/validation.middleware";
import { getUsersQuerySchema, usernameSchema } from "../validations/user.validaions";


const userRouter = Router();


const getUserMW = validateSchemaParams(getUsersQuerySchema);
const deleteUserMW = validateSchemaParams(usernameSchema);
const postUsernameMW = validateSchemaBody(usernameSchema);



// userRouter.get('/', (req, res) => res.send("Hiii"));
userRouter.get('/', getUserMW, userController.getUsers);
userRouter.post('/', postUsernameMW, userController.saveAndGetUser);

userRouter.put('/:username', userController.update);
userRouter.delete('/:username',deleteUserMW, userController.delete);

export default userRouter;