import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { UserService } from '../services/user.service';


export const save = async (req: Request, res: Response) => {
    const username: string = req.body?.username;

    if (!username || username.length <= 0) return res.send({ message: "username is required" });
    const user = await UserService.fetchAndSaveUser(username.toLowerCase());

    res.send({ message: "req processed successfully", user });
    return;
};

export const update = async (req: Request, res: Response) => {

    const { username } = req.params;
    if (!username || username.length <= 0) return res.send({ message: "username is required" });

    const userData = req.body;
    const updatedUser = await UserService.update(username, userData);
    res.send(updatedUser);
};



export const userController = {
    saveAndGetUser: catchAsync(save),
    update: catchAsync(update),
}