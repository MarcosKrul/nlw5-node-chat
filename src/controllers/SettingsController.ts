import { Request, Response } from "express";
import AppError from "../errors/AppError";

import { CreateSettingsService } from "../services/settingsServices";

class SettingsController {
    async create(req: Request, res: Response): Promise<Response> { 
        try {
            const { chat, username } = req.body;
            
            const createSettingsService = new CreateSettingsService();

            const response = await createSettingsService.execute({ chat, username });
    
            return res.status(200).send(response); 
        } catch (error) {
            const code = error instanceof AppError? error.statusCode : 500
            
            return res.status(code).send({
                error: error.message
            })
        }
    }
}

export default SettingsController;