import { Request, response, Response } from "express";
import { Task } from "../models";
import { List } from "../models";

export default class TaskController {
    createTask = async (req: Request, res: Response) => {
        const { listId, description } = req.body;

        try {
            const list = await List.findById(listId);
            if (!list)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            const task = await Task.create({ list:listId, description });
            await list.updateOne({
                $addToSet: {
                    tasks: task._id
                }});
            await list.save();

            return res
                .status(200)
                .send({ message: "Tarefa adicionada com sucesso" });
        } catch (error) {
            console.error({error:error.message});
            return res
                .status(400)
                .send({ message: "Ocorreu um erro ao adicionar a tarefa" });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const response = await Task.find().populate("list");
            if (!response)
                return res
                    .status(404)
                    .send({ message: "Nenhuma tarefa encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            return res.status(400).send({ message: "Erro ao buscar tarefa" });
        }
    };
    update = async (req: Request, res: Response) => {
        try {
            // console.log({body:req.body})
            const response = await Task.findByIdAndUpdate(
                req.body.id,
                req.body,
                {
                    new: true,
                }
            );
            if (!response)
                return res
                    .status(404)
                    .send({ message: "Tarefa não encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            // console.error({error:error})
            return res
                .status(400)
                .send({ message: "Ocorreu um erro ao atualizar a tarefa" });
        }
    };
    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const response = await Task.findByIdAndDelete(id);
            if (!response)
                return res
                    .status(404)
                    .send({ message: "Tarefa não encontrada" });
            return res
                .status(200)
                .send({ message: "Tarefa excluida com sucesso" });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Ocorreu um erro ao tentar excluir tarefa" });
        }
    };
}
