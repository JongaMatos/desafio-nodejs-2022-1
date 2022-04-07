import { Request, Response } from "express";
import { TaskList } from "../models";

export default class TaskListController {
    createTaskList = async (req: Request, res: Response) => {
        try {
            await TaskList.create(req.body);
            res.status(200).json({
                message: "Lista de tarefas criada com sucesso",
            });
        } catch (error) {
            return res
                .status(400)
                .json({ message: "Erro ao criar lista de tarefas" });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const response = await TaskList.find();
            if (!response)
                return res
                    .status(404)
                    .send({ message: "Nenhuma lista encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            return res
                .status(400)
                .json({ message: "Erro ao buscar lista de tarefas" });
        }
    };
}
