import { getCustomRepository } from "typeorm";
import Connections from "../../entities/Connections";
import ConnectionsRepository from "../../repositories/ConnectionsRepository";

interface IParams {
    user_id: string;
}

class GetConnectionByUserIdService {
    public async execute({ user_id }: IParams): Promise<Connections | undefined> {

        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        const connection = connectionsRepository.findOne({
            where: { user_id }
        });

        return connection;
    }
}

export default GetConnectionByUserIdService;