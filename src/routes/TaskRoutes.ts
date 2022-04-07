import { Router } from "express";
import { TaskController } from "../controllers";

const taskRoutes = Router();
const taskController = new TaskController();


export default taskRoutes;