import { getCustomRepository } from "typeorm";
import ConnectionsRepository from "../../repositories/ConnectionsRepository";

interface IParams {
    admin_id: string;
    user_id: string;
}

class UpdateAdminByUserIdService {
    public async execute({ admin_id, user_id }: IParams): Promise<void> {

        const connectionsRepository = getCustomRepository(ConnectionsRepository);

        await connectionsRepository.update(
            { user_id },
            { admin_id }
        );
    }
}

export default UpdateAdminByUserIdService;