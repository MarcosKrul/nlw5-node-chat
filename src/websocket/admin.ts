import { io } from "../http";
import {
    GetConnectionByUserIdService,
    FindAllMessagesWithoutAdminService
} from "../services/connectionsServices";
import {
    CreateMessagesService,
    ListUserMessagesService
} from "../services/messagesServices";

interface IListParams {
    user_id: string;
}

interface ISendParams {
    text: string;
    user_id: string;
}

io.on("connect", async (socket) => {

    const createMessagesService = new CreateMessagesService();
    const listUserMessagesService = new ListUserMessagesService();
    const getConnectionByUserIdService = new GetConnectionByUserIdService();
    const findAllMessagesWithoutAdminService = new FindAllMessagesWithoutAdminService();

    const allMessagesWithoutAdmin = await findAllMessagesWithoutAdminService.execute();
    
    io.emit("admin_list_all_users", allMessagesWithoutAdmin);


    socket.on("admin_list_messages_by_user", async ({user_id}: IListParams, callback) => {
        const response = await listUserMessagesService.execute({ user_id });
        callback(response);
    });

    socket.on("admin_send_message", async ({ text, user_id }: ISendParams) => {

        await createMessagesService.execute({ 
            text, 
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await getConnectionByUserIdService.execute({ user_id });

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        });
    });

});