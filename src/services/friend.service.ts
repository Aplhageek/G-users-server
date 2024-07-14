import httpStatus from 'http-status';
import { prismaClient } from '../client/prisma';
import ApiError from '../utils/ApiError';
import axios from 'axios';
const GITHUB_API_URL = 'https://api.github.com/users/';


export class FriendService {

    public static getFollowersOf = async (username: string): Promise<string[]> => {
        try {
            console.log(username, "================================================");
            const response = await axios.get(`${GITHUB_API_URL}${username}/followers`);
            const followers = response.data.map((follower: { login: string }) => follower.login.toLowerCase());
            console.log("followers", followers);
            return followers;
        } catch (error) {
            console.error("Error fetching followers from GitHub API", error);
            throw new ApiError(httpStatus.NOT_FOUND, "Failed to get users followers");
        }
    };

    public static getFollowingsOf = async (username: string): Promise<string[]> => {
        try {
            const response = await axios.get(`${GITHUB_API_URL}${username}/following`);
            const followings = response.data.map((follower: { login: string }) => follower.login.toLowerCase());
            console.log("followings", followings);
            return followings;
        } catch (error) {
            console.error("Error fetching followings from GitHub API", error);
            throw new ApiError(httpStatus.NOT_FOUND, "Failed to get users followings");
        }

    };
    
    
    public static getFriendsOf = async (username: string): Promise<string[]> => {
        try {
            console.log("req recieved for friends");

            const followers = await this.getFollowersOf(username);
            const followings = await this.getFollowingsOf(username);

            console.log(followers.length);
            console.log(followings.length);

            if(followers.length < 1 || followings.length < 1) return [];

            let smaller, largerSet;

            if(followers.length > followings.length) {
                // then create set of followers
                largerSet = new Set(followers);
                smaller = followings;
            }else{
                largerSet = new Set(followings);
                smaller = followers;
            }

            const friends = smaller.filter(entry => largerSet.has(entry));
            console.log("friends: " + friends);

            return friends;
        } catch (error) {
            console.error("Error fetching followings from GitHub API", error);
            throw new ApiError(httpStatus.NOT_FOUND, "Failed to get users followings");
        }
    };


}