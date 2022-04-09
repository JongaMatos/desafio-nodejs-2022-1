import { Router } from "express";
import { TaskController } from "../controllers";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/", (req, res) => {
    taskController.createTask(req, res);
});
taskRoutes.get("/all", (req, res) => {
    taskController.getAll(req, res);
});
taskRoutes.patch("/", (req, res) => {
    taskController.update(req, res);
});
taskRoutes.delete("/", (req, res) => {
    taskController.delete(req, res);
});

export default taskRoutes;
