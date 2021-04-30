import express from "express";
import "./database";
import routes from "./routes/index.routes"

const app = express();

app.use(express.json())

app.use(routes);

app.listen(process.env.PORT || 3333, () => 
    console.log(`server ir running at port ${process.env.PORT || 3333}`)
);
