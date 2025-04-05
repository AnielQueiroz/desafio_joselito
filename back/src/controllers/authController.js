"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_1 = require("../api");
const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não encontrado no arquivo .env.");
}
;
async function loginController(data) {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
    }
    const user = await userRepository_1.userRepository.findByEmail(email);
    if (!user)
        throw new api_1.NotFound("Usuário não encontrado.");
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new api_1.InvalidCredentials("Senha incorreta.");
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "7d"
    });
    const authPayload = {
        user,
        token
    };
    return authPayload;
}
