import { Router } from "express";
import { TaskListController } from "../controllers";

const taskListRoutes = Router();
const taskListController = new TaskListController();

taskListRoutes.post("/", (req, res) => {
    taskListController.createTaskList(req, res);
});

taskListRoutes.get("/all", (req, res) => {
    taskListController.getAll(req, res);
});


export default taskListRoutes;
