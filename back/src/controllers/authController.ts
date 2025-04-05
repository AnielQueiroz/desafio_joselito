import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
import { InvalidCredentials, NotFound } from '../api';

const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não encontrado no arquivo .env.");
};

interface loginRequest {
    email: string;
    password: string;
}

export async function loginController(data: loginRequest) {
    const { email, password } = data;
    
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
    }

    const user = await userRepository.findByEmail(email);
    
    if (!user) throw new NotFound("Usuário não encontrado.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new InvalidCredentials("Senha incorreta.");
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "7d"
    });

    const authPayload = {
        user,
        token
    };

    return authPayload; 
}