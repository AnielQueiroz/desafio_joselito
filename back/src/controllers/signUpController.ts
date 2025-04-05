import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import { UserAlreadyExists } from "../api";

interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export async function signUpController(data: SignUpRequest) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new Error("Nome, email e senha são obrigatórios.");
    };

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new UserAlreadyExists("Email já cadastrado.");
    };
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword
    });

    if (!newUser) {
        throw new Error("Erro ao criar usuário.");
    };

    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
}