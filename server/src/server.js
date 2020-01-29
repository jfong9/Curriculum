import express from "express";
import schools from "../src/api/schools.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/v1/schools", schools);

export default app;