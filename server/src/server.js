import express from "express";
import schools from "../src/api/schools.route";
import students from "../src/api/students.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/v1/schools", schools);
app.use("/api/v1/students", students)
export default app;