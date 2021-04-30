import { Router } from "express";
import settingsRoutes from "./settings.routes";
import usersRoutes from "./users.routes";

const routes = Router();

routes.use(usersRoutes);
routes.use(settingsRoutes);

export default routes;