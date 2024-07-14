import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validateSchemaBody, validateSchemaParams, validateSchemaQuery } from "../middlewares/validation.middleware";
import { getUsersQuerySchema, usernameSchema } from "../validations/user.validaions";


const userRouter = Router();


const getUserMW = validateSchemaQuery(getUsersQuerySchema);
const usernameInParamsMW = validateSchemaParams(usernameSchema);
const usernameInBodyMW = validateSchemaBody(usernameSchema);



// userRouter.get('/', (req, res) => res.send("Hiii"));
userRouter.get('/', getUserMW, userController.getUsers);

userRouter.post('/', usernameInBodyMW, userController.saveAndGetUser);

userRouter.put('/:username',usernameInParamsMW, userController.update);
userRouter.delete('/:username',usernameInParamsMW, userController.delete);
userRouter.get('/friends/:username',usernameInParamsMW , userController.getFriends);

export default userRouter;