import { http } from "./http";
import "./websocket/admin";
import "./websocket/client";

http.listen(process.env.PORT || 3333, () => 
    console.log(`server is running at port ${process.env.PORT || 3333}`)
);
