import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';
import type { User } from '@prisma/client';
import { InvalidCredentials, NotFound } from '../api';

const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não encontrado no arquivo .env.");
};

interface AuthContext {
    token: string | undefined;
    user?: Omit<User, 'password'>;
}

export async function authMiddleware(ctx: AuthContext) {
    const { token } = ctx;

    if (!token) {
        throw new Error("Token não fornecido.");
    }

    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const id = payload.id;

    if (!id) {
        throw new InvalidCredentials("ID do usuário não fornecido.");
    }    

    try {
        const user = await userRepository.findById(payload.id);
        if (!user) {
            throw new NotFound("Usuário não encontrado.");
        }

        ctx.user = user;
    } catch (error) {
        throw new Error("Token inválido ou expirado.");
    }
}