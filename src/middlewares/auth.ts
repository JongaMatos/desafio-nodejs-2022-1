import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { Schema } from "mongoose";
import { env } from "process";

const tokenGenerator = async (
    id: Schema.Types.ObjectId,
    username: String,
    expiresIn: number
) => {
    try {
        const token = await sign(
            {
                id: id,
                user: username,
            },
            env.SECRET,
            { expiresIn }
        );

        return token;
    } catch (error) {
        console.log({ error: error.message });
        return undefined;
    }
};

interface Idata {
    id: string;
    iat: number;
    exp: number;
}

const autenticator = async (req: Request, res: Response, next: () => void) => {
    try {
        var token = req.body.token || req.params.token || req.query.token;

        if (!token) res.status(401).send({ message: "Token não informado" });

        const data = await verify(token, env.SECRET);

        res.locals.userId = (<Idata>data).id;
        if (res.locals.userId == (<Idata>data).id) next();
    } catch (error) {

        if (error.message === "jwt expired")
            return res.status(401).send({ message: "Login expirado" });

        return res.status(401).send({ message:"Token invalido"});
    }
};

export { tokenGenerator, autenticator };
