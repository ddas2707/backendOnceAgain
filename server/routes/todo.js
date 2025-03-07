import express from "express";
import { createTodo, getTodos, updateTodos, deleteTodos } from "../controllers/todo.js";
import { isAuth } from "../middleware/isAuth.js";
const router = express.Router();

router.route("/").post(isAuth, createTodo).get(getTodos);
router.route("/:todo_Id").put(isAuth, updateTodos).delete(isAuth, deleteTodos);
export default router;
