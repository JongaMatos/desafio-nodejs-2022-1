import { Router } from "express";
import { autenticator } from "../middlewares/auth";

const testRoutes = Router();

testRoutes.post("/", autenticator, (req, res) => {
    console.log(req.params.userId)
    return res.status(200).send({ message: "Tudo certo" });
});

export default testRoutes;
