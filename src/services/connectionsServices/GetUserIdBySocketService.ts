import { getCustomRepository } from "typeorm";
import Connections from "../../entities/Connections";
import ConnectionsRepository from "../../repositories/ConnectionsRepository";

interface IParams {
    socket_id: string;
}

class GetUserIdBySocketService {
    public async execute({ socket_id }: IParams): Promise<Connections> {

        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        const connection = connectionsRepository.findOne({
            where: { socket_id },
            relations: ["user"]
        });

        return connection;
    }
}

export default GetUserIdBySocketService;