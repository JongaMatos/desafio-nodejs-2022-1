import { Request, Response } from "express";
import { List, Task } from "../models";

export default class ListController {
    createList = async (req: Request, res: Response) => {
        try {
            await List.create(req.body);
            res.status(200).json({
                message: "Lista de tarefas criada com sucesso",
            });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Erro ao criar lista de tarefas" });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const response = await List.find().populate("tasks");
            // const response = await List.find();

            if (!response)
                return res
                    .status(404)
                    .send({ message: "Nenhuma lista encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            console.error({error:error.message});
            return res
                .status(400)
                .send({ message: "Erro ao buscar lista de tarefas" });
        }
    };

    update = async (req: Request, res: Response) => {
        const { id, title } = req.body;
        try {
            const response = await List.findByIdAndUpdate(
                id,
                { title },
                { new: true }
            );

            if (!response)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Erro ao atualizar lista de tarefas" });
        }
    };
    delete = async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const list = await List.findByIdAndDelete(id);
            await Task.deleteMany({list:id});

            if (!list)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            return res.status(200).send({message:"Lista excluida com sucesso"});
        } catch (error) {
            console.error({error:error.message})
            return res
                .status(400)
                .send({ message: "Erro ao deletar a lista de tarefas" });
        }
    };
}
