import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { User } from "../models";
import { tokenGenerator } from "../middlewares/auth";

export default class UserController {
    createUser = async (req: Request, res: Response) => {
        try {
            await User.create(req.body);

            return res
                .status(200)
                .send({ message: "Usuário criado com sucesso" });
        } catch (error) {
            return res.status(400).send({ message: "Erro ao criar usuário" });
        }
    };
    login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            if (!username || !password)
                return res
                    .status(400)
                    .send({ message: "Usuário e/ou senha não inseridos" });

            const user = await User.findOne({ username }).select("+password");

            const check = await bcrypt.compare(password, user.password);

            if (!check)
                return res
                    .status(400)
                    .send({ message: "Senha e/ou usuario incorretos" });

            const token = await tokenGenerator(
                user._id,
                user.username,
                1
            );

            return res.status(200).send({ token });
        } catch (error) {
            return res
                .status(400)
                .send({ message: "Senha e/ou usuario incorretos" });
        }
    };
}
