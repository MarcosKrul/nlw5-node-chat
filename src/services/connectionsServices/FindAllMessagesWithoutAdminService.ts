import { getCustomRepository } from "typeorm";
import Connections from "../../entities/Connections";
import ConnectionsRepository from "../../repositories/ConnectionsRepository";

class FindAllMessagesWithoutAdminService {
    public async execute(): Promise<Connections[]> {

        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        const connections = connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;
    }
}

export default FindAllMessagesWithoutAdminService;