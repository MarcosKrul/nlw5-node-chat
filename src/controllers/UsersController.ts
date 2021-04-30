import { Request, Response } from "express";
import AppError from "../errors/AppError";

import { CreateUserService } from "../services/usersServices";

class UsersController {
    async create(req: Request, res: Response): Promise<Response> { 
        try {
            const { email } = req.body;
            
            const createUsersService = new CreateUserService();

            const response = await createUsersService.execute({ email });
    
            return res.status(200).send(response); 
        } catch (error) {
            const code = error instanceof AppError? error.statusCode : 500
            
            return res.status(code).send({
                error: error.message
            })
        }
    }
}

export default UsersController;