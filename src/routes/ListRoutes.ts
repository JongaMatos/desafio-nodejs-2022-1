import { Router } from "express";
import { ListController } from "../controllers";

const listRoutes = Router();
const listController = new ListController();

listRoutes.post("/", (req, res) => {
    listController.createList(req, res);
});

listRoutes.get("/all", (req, res) => {
    listController.getAll(req, res);
});

listRoutes.get("/:id", (req, res) => {
    listController.getOne(req, res);
});

listRoutes.patch("/", (req, res) => {
    listController.update(req, res);
});

listRoutes.delete("/", (req, res) => {
    listController.delete(req, res);
});


export default listRoutes;
