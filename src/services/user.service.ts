import axios from 'axios';
import { Prisma, User } from '@prisma/client';
import ApiError from '../utils/ApiError';
import { prismaClient } from '../client/prisma';


export class UserService {

    public static update = async (username: string, userData: any) => {
        return await prismaClient.user.update({
            where: { username },
            data: userData,
        });
    };

    public static create = async (userData: Prisma.UserCreateInput): Promise<User> => {
        console.log("creating user");
        return await prismaClient.user.create({ data: userData });
    }

    private static fetchUserFromGitHub = async (username: string) => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            console.log("res from axios");
            return response.data;
        } catch (error) {
            throw new ApiError(404, "Could not fetch user from github");
        }
    };

    public static getByUsername = async (username: string): Promise<User | null> => {
        console.log("Checking for user in database:", username);
        const user = await prismaClient.user.findUnique({ where: { username } });
        return user;
    };


    public static fetchAndSaveUser = async (username: string): Promise<User> => {
        const existingUser = await this.getByUsername(username);
        if (existingUser) return existingUser;

        const userData = await this.fetchUserFromGitHub(username);
        if (!userData) throw new ApiError(400, "User not found");

        const userToCreate = {
            username: username,
            githubUsername: userData.login,
            name: userData.name,
            bio: userData.bio,
            location: userData.location,
            blog: userData.blog,
            publicRepos: userData.public_repos,
            publicGists: userData.public_gists,
            followers: userData.followers,
            following: userData.following,
        }
        return await this.create(userToCreate as User);
    };

}