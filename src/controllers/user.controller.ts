import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { UserService } from '../services/user.service';


export const save = async (req: Request, res: Response) => {
    const { username } = req.body;
    if(!username) return res.send({message : "username is required"});
    const user = await UserService.fetchAndSaveUser(username);
    res.send({message : "req processed successfully" , user});
    return;
};

export const userController = {
    saveAndGetUser: catchAsync(save),
}