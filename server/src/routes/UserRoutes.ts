import { Router } from "express";
import { UserController } from "../controllers";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", (req, res) => {
    userController.createUser(req, res);
});
userRoutes.post("/login", (req, res) => {
    userController.login(req, res);
});

export default userRoutes;