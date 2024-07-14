import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { UserService } from '../services/user.service';
import { FriendService } from '../services/friend.service';
import httpStatus from 'http-status';


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

export const getUsers = async (req: Request, res: Response) => {
    const { username, name, location, sortBy } = req.query as {
        username?: string;
        name?: string;
        location?: string;
        sortBy?: string;
    };

    const users = await UserService.get(username, name, location, sortBy);
    res.send(users);
};


export const deleteUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await UserService.softDelete(username as string);
    res.send({ messege: "Successfully deleted" });
};


export const getFriends = async (req: Request, res: Response) => {
    const { username } = req.params;
    const friends = await FriendService.getFriendsOf(username as string);
    res.send(friends);
};

export const userController = {
    saveAndGetUser: catchAsync(save),
    update: catchAsync(update),
    getUsers: catchAsync(getUsers),
    delete: catchAsync(deleteUser),
    getFriends: catchAsync(getFriends),
}