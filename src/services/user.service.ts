import axios from 'axios';
import { Prisma, User } from '@prisma/client';
import ApiError from '../utils/ApiError';
import { prismaClient } from '../client/prisma';

const GITHUB_API_URL = 'https://api.github.com/users/';



export class UserService {

    public static get = async (username?: string, name?: string, location?: string, sortBy?: string) => {
        const searchQuery: Prisma.UserFindManyArgs = {
            where: {
                isDeleted: false,
                ...(username && { username: { contains: username.toString(), mode: 'insensitive' } }),
                ...(name && { name: { contains: name.toString(), mode: 'insensitive' } }),
                ...(location && { location: { contains: location.toString(), mode: 'insensitive' } }),
            },
            orderBy: sortBy ? { [sortBy.toString()]: 'desc' } : undefined,
        };

        return await prismaClient.user.findMany(searchQuery);
    };

    public static softDelete = async (username?: string, name?: string, location?: string, sortBy?: string) => {
        return await prismaClient.user.update({
            where: { username },
            data: { isDeleted: true },
        });
    };

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
            const response = await axios.get(`${GITHUB_API_URL}${username}`);
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
            profilePic: userData.avatar_url,
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