import { PrismaClient, User } from '@prisma/client'

const GITHUB_API_URL = 'https://api.github.com/users/';
import axios from 'axios';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export const prismaClient = new PrismaClient();
