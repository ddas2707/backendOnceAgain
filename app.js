import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db/database.js";

import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Listen at port ${PORT}`);
});  