import { Router } from "express";
import { ListController } from "../controllers";
import { autenticator } from "../middlewares/auth";

const listRoutes = Router();
const listController = new ListController();

listRoutes.post("/", autenticator, (req, res) => {
    listController.createList(req, res);
});

listRoutes.get("/all", autenticator, (req, res) => {
    listController.getAll(req, res);
});

listRoutes.get("/:id", autenticator, (req, res) => {
    listController.getOne(req, res);
});

listRoutes.patch("/",autenticator, (req, res) => {
    listController.update(req, res);
});

listRoutes.delete("/",autenticator, (req, res) => {
    listController.delete(req, res);
});

export default listRoutes;
