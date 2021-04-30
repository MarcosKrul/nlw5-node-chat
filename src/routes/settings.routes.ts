import { Router } from "express";

const routes = Router();

routes.get("/settings", (req, res) => {
    return res.status(200).json({
        message: "Lista de settings"
    })
});

export default routes;