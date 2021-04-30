import { Request, Response } from "express";
import AppError from "../errors/AppError";

import { 
    CreateMessagesService,
    ListUserMessagesService,
} from "../services/messagesServices";

class MessagesController {
    async create(req: Request, res: Response): Promise<Response> { 
        try {
            const { text, user_id, admin_id } = req.body;
            
            const createMessagesService = new CreateMessagesService();

            const response = await createMessagesService.execute({
                text,
                user_id,
                admin_id
            });
    
            return res.status(200).send(response); 
        } catch (error) {
            const code = error instanceof AppError? error.statusCode : 500
            
            return res.status(code).send({
                error: error.message
            })
        }
    }

    async indexByUser(req: Request, res: Response): Promise<Response> { 
        try {
            const { id } = req.params;
            
            const listUserMessagesService = new ListUserMessagesService();

            const response = await listUserMessagesService.execute({ user_id: id });
    
            return res.status(200).send(response); 
        } catch (error) {
            const code = error instanceof AppError? error.statusCode : 500
            
            return res.status(code).send({
                error: error.message
            })
        }
    }
}

export default MessagesController;