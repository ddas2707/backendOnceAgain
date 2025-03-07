import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide title and description"
            })
        }
        const todo = await Todo.create({
            title,
            description
        })
        return res.status(200).json({
            success: true,
            message: "Todo created successfully",
            todo,
        })
    } catch (err) {
        console.log(err);
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            todos
        })
    } catch (err) {
        console.log(err);
    }
}

export const updateTodos = async (req, res) => {
    try {
        const todo_id = req.params.todo_Id;
        const { title } = req.body;
        //console.log(`title changed--> new ${title}`)
        // const todo = await Todo.findById(todo_id);
        // todo.title = title;
        const todo = await Todo.findByIdAndUpdate(todo_id, { title }, { new: true });
        await todo.save();
        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo
        })

    } catch (err) {
        console.log(err);
    }
}

export const deleteTodos = async (req, res) => {
    try {
        const todo_Id = req.params.todo_Id;
        const deleted_todo = await Todo.findByIdAndDelete(todo_Id);
        const check_todo = await Todo.findById(todo_Id);
        if (!check_todo) {
            console.log("todo donot exists hence deleted successfully");
            return res.status(200).json({
                success: true,
                message: "Todo deleted successfully"
            })
        }
        return res.status(500).json({
            success: true,
            message: "internal server error"
        })
    } catch (err) {
        console.log(err);
    }
}