import { io } from "../http";
import {
    FindAllMessagesWithoutAdminService
} from "../services/connectionsServices";

io.on("connect", async (socket) => {

    const findAllMessagesWithoutAdminService = new FindAllMessagesWithoutAdminService();

    const allMessagesWithoutAdmin = await findAllMessagesWithoutAdminService.execute();
    
    io.emit("admin_list_all_users", allMessagesWithoutAdmin);

});