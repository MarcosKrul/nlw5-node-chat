import express from "express";

const app = express();

app.listen(process.env.PORT || 3333, () => 
    console.log(`server ir running at port ${process.env.PORT || 3333}`)
);
