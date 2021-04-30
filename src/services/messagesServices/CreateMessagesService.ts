import { getCustomRepository } from "typeorm";
import Messages from "../../entities/Messages";
import MessagesRepository from "../../repositories/MessagesRepository";

interface IParams {
    text: string;
    user_id: string;
    admin_id?: string;
}

class CreateMessagesService {
    public async execute({ text, user_id, admin_id }: IParams): Promise<Messages> {

        const messagesRepository = getCustomRepository(MessagesRepository);

        const message = messagesRepository.create({
            text, 
            user_id,
            admin_id
        });

        const save = await messagesRepository.save(message);

        return save;
    }
}

export default CreateMessagesService;