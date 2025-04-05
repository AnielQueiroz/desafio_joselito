"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = signUpController;
const userRepository_1 = require("../repositories/userRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const api_1 = require("../api");
async function signUpController(data) {
    const { name, email, password } = data;
    if (!name || !email || !password) {
        throw new Error("Nome, email e senha são obrigatórios.");
    }
    ;
    const existingUser = await userRepository_1.userRepository.findByEmail(email);
    if (existingUser) {
        throw new api_1.UserAlreadyExists("Email já cadastrado.");
    }
    ;
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const newUser = await userRepository_1.userRepository.create({
        name,
        email,
        password: hashedPassword
    });
    if (!newUser) {
        throw new Error("Erro ao criar usuário.");
    }
    ;
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}
