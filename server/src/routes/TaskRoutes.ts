import { Router } from "express";
import { TaskController } from "../controllers";
import { autenticator } from "../middlewares/auth";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post("/", autenticator, (req, res) => {
    taskController.createTask(req, res);
});
taskRoutes.get("/all", autenticator, (req, res) => {
    taskController.getAll(req, res);
});
taskRoutes.patch("/", autenticator, (req, res) => {
    taskController.update(req, res);
});
taskRoutes.delete("/", autenticator, (req, res) => {
    taskController.delete(req, res);
});

export default taskRoutes;
