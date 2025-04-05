import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { InvalidCredentials, NotFound } from "../api";

const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não encontrado no arquivo .env.");
};

export async function checkAuthController(token: string) {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const id = payload.id;

    if (!id) {
        throw new InvalidCredentials("ID do usuário não fornecido.");
    }    

    try {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new NotFound("Usuário não encontrado.");
        }

        return user;
    } catch (error) {
        throw new InvalidCredentials("Token inválido ou expirado.");
    }
}