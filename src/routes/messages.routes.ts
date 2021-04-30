import { Router } from "express";
import MessagesController from "../controllers/MessagesController";

const routes = Router();
const messagesController = new MessagesController();


routes.get("/messages/:id", messagesController.indexByUser);
routes.post("/messages", messagesController.create);


export default routes;