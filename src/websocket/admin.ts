import { io } from "../http";
import {
    FindAllMessagesWithoutAdminService
} from "../services/connectionsServices";
import {
    ListUserMessagesService
} from "../services/messagesServices";

interface params {
    user_id: string;
}

io.on("connect", async (socket) => {

    const listUserMessagesService = new ListUserMessagesService();
    const findAllMessagesWithoutAdminService = new FindAllMessagesWithoutAdminService();

    const allMessagesWithoutAdmin = await findAllMessagesWithoutAdminService.execute();
    
    io.emit("admin_list_all_users", allMessagesWithoutAdmin);


    socket.on("admin_list_messages_by_user", async ({user_id}: params, callback) => {
        console.log(user_id);
        const response = await listUserMessagesService.execute({ user_id });
        callback(response);
    });

});