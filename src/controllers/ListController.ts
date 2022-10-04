import { Request, Response } from "express";
import { List, Task } from "../models";

export default class ListController {
    createList = async (req: Request, res: Response) => {
        try {
            await List.create({
                title: req.body.title,
                user: res.locals.userId,
            });
            res.status(200).json({
                message: "Lista de tarefas criada com sucesso",
            });
        } catch (error) {
            console.log({ error: error.message });
            return res
                .status(400)
                .send({ message: "Erro ao criar lista de tarefas" });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const response = await List.find({ user: res.locals.userId });
            // const response = await List.find();

            if (!response)
                return res
                    .status(404)
                    .send({ message: "Nenhuma lista encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            console.error({ error: error.message });
            return res
                .status(400)
                .send({ message: "Erro ao buscar lista de tarefas" });
        }
    };
    getOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const response = await List.findById(id).populate("tasks", "user");
            // const response = await List.find();

            if (!response)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            return res.status(200).send(response);
        } catch (error) {
            console.error({ error: error.message });
            return res
                .status(400)
                .send({ message: "Erro ao buscar lista de tarefas" });
        }
    };
    update = async (req: Request, res: Response) => {
        const { id, title } = req.body;
        try {
            const list = await List.findById(id);

            if (!list)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            var response;
            if (list.user == res.locals.userId)
                response = await list.updateOne({ title });
            else
                return res
                    .status(401)
                    .send({ message: "Permissão de edição negada" });

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
            const list = await List.findById(id);

            if (!list)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            if (list.user == res.locals.userId) {
                list.deleteOne();
                await Task.deleteMany({ list: id });
            } else
                return res
                    .status(401)
                    .send({ message: "Permissão de deleção negada" });


            return res
                .status(200)
                .send({ message: "Lista excluida com sucesso" });
        } catch (error) {
            console.error({ error: error.message });
            return res
                .status(400)
                .send({ message: "Erro ao deletar a lista de tarefas" });
        }
    };
}
