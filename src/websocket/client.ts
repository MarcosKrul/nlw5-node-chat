import { io } from "../http";
import { 
    CreateUserService, 
    FindUserByEmailService, 
} from "../services/usersServices";
import { 
    CreateConnectionsService, 
    GetUserIdBySocketService,
    GetConnectionByUserIdService 
} from "../services/connectionsServices";
import {
    CreateMessagesService,
    ListUserMessagesService
} from "../services/messagesServices";


interface IParams {
    text: string;
    email: string;
}

interface INewMsgParams {
    text: string;
    socket_admin: string;
}


io.on("connect", (socket) => {
    const createUserService = new CreateUserService();
    const createMessagesService = new CreateMessagesService();
    const findUserByEmailService = new FindUserByEmailService();
    const listUserMessagesService = new ListUserMessagesService();
    const createConnectionService = new CreateConnectionsService();
    const getUserIdBySocketService = new GetUserIdBySocketService();
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


        const allMessages = await listUserMessagesService.execute({ user_id });
        socket.emit("client_list_all_messages", allMessages);

    });

    socket.on("client_send_to_admin", async ({ socket_admin, text }: INewMsgParams) => {

        const { user_id } = await getUserIdBySocketService.execute({ socket_id: socket.id });

        const message = await createMessagesService.execute({
            text, 
            user_id, 
            admin_id: socket_admin,
        });

        io.to(socket_admin).emit("admin_receive_message", {
            message, 
            socket_id: socket.id
        });
    });
    
});