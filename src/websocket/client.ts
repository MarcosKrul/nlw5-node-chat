import { io } from "../http";
import { 
    CreateUserService, 
    FindUserByEmailService, 
} from "../services/usersServices";
import { 
    CreateConnectionsService, 
    GetConnectionByUserIdService 
} from "../services/connectionsServices";
import {
    CreateMessagesService
} from "../services/messagesServices";


interface IParams {
    text: string;
    email: string;
}


io.on("connect", (socket) => {
    const createUserService = new CreateUserService();
    const createMessagesService = new CreateMessagesService();
    const findUserByEmailService = new FindUserByEmailService();
    const createConnectionService = new CreateConnectionsService();
    const getConnectionByUserIdService = new GetConnectionByUserIdService();

    socket.on("client_first_access", async params => {

        let user_id = null;
        const socket_id = socket.id;
        const { text, email } = params as IParams;

        const hasUser = await findUserByEmailService.execute({ email });

        if (!hasUser) {
            const user = await createUserService.execute({ email });
            await createConnectionService.execute({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;
        } else {
            user_id = hasUser.id;

            const hasConnection = await getConnectionByUserIdService.execute({
                user_id: hasUser.id
            });

            if (!hasConnection) {
                await createConnectionService.execute({
                    socket_id,
                    user_id: hasUser.id
                });
            } else {
                hasConnection.socket_id = socket_id;
                await createConnectionService.execute(hasConnection);
            }
        }
        
        await createMessagesService.execute({
            text,
            user_id
        });

    });
});