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

// const tokenDecoder = async (token: string) => {
//     try {
//         const data = await verify(token, env.SECRET);
//         return data;
//     } catch (error) {
//         return undefined;
//     }
// };

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

        req.params.userId = (<Idata>data).id;

        next();
        
    } catch (error) {
        if (error.message === "invalid signature")
            res.status(401).send({ message: "Token invalido" });
        else {
            res.status(401).send({ error: error.message });
        }
    }
};

export { tokenGenerator, autenticator };
