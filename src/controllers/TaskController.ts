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

            if (list.user != res.locals.userId)
                return res
                    .status(401)
                    .send({ message: "Permissão de criação de tarefa negada" });

            const task = await Task.create({
                list: listId,
                description,
                user: res.locals.userId,
            });
            await list.updateOne({
                $addToSet: {
                    tasks: task._id,
                },
            });
            await list.save();

            return res
                .status(200)
                .send({ message: "Tarefa adicionada com sucesso" });
        } catch (error) {
            console.error({ error: error.message });
            return res
                .status(400)
                .send({ message: "Ocorreu um erro ao adicionar a tarefa" });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const list = await List.findById(req.body.listId).populate("tasks");

            if (!list)
                return res
                    .status(404)
                    .send({ message: "Lista não encontrada" });

            if (list.user != res.locals.userId)
                return res.status(401).send({ message: "Acesso negado" });

            return res.status(200).send(list.tasks);
        } catch (error) {
            return res.status(400).send({ message: "Erro ao buscar tarefas" });
        }
    };
    update = async (req: Request, res: Response) => {
        try {
            // console.log({body:req.body})
            const task = await Task.findById(req.body.id);

            if (!task)
                return res
                    .status(404)
                    .send({ message: "Tarefa não encontrada" });

            if (task.user != res.locals.userId)
                return res
                    .status(401)
                    .send({ message: "Permissão de edição negada" });

            await task.updateOne(req.body);

            return res
                .status(200)
                .send({ message: "Tarefa atualizada com sucesso" });
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
            const task = await Task.findById(id);
            if (!task)
                return res
                    .status(404)
                    .send({ message: "Tarefa não encontrada" });

            if (task.user != res.locals.userId)
                return res.status(400).send({
                    message: "Exclusão negada",
                });

            await task.deleteOne();

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
