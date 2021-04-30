import { Router } from "express";
import settingsRoutes from "./settings.routes";
import usersRoutes from "./users.routes";
import messagesRoutes from "./messages.routes";

const routes = Router();

routes.use(usersRoutes);
routes.use(settingsRoutes);
routes.use(messagesRoutes);

export default routes;