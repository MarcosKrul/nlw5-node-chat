import { getCustomRepository } from "typeorm";
import Messages from "../../entities/Messages";
import MessagesRepository from "../../repositories/MessagesRepository";

interface IParams {
    user_id: string;
}

class ListUserMessagesService {
    public async execute({ user_id }: IParams): Promise<Messages[]> {

        const messagesRepository = getCustomRepository(MessagesRepository);

        const messages = messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return messages;
    }
}

export default ListUserMessagesService;