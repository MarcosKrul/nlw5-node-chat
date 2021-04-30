import { getCustomRepository } from "typeorm";
import Connections from "../../entities/Connections";
import ConnectionsRepository from "../../repositories/ConnectionsRepository";

interface IParams {
    id?: string;
    user_id: string;
    socket_id: string;
    admin_id?: string;
}

class CreateConnectionsService {
    public async execute({ id, user_id, admin_id, socket_id }: IParams): Promise<Connections> {

        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        const connection = connectionsRepository.create({
            id,
            user_id,
            admin_id,
            socket_id
        });

        const save = await connectionsRepository.save(connection);

        return save;
    }
}

export default CreateConnectionsService;