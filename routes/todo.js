import express from "express";
import { createTodo, getTodos, updateTodos, deleteTodos } from "../controllers/todo.js";
const router = express.Router();

router.route("/").post(createTodo).get(getTodos);
router.route("/:todo_Id").put(updateTodos).delete(deleteTodos);
export default router;
