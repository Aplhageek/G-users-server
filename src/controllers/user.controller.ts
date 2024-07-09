import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';



export const saveAndGetUser = async (req: Request, res: Response) => {
    const { username } = req.body;


    // const response = await axios.get(`https://api.github.com/users/${username}`);
    // const userData = response.data;

};



export default {
    save: catchAsync(saveAndGetUser),

}