"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const api_1 = require("../api");
const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não encontrado no arquivo .env.");
}
;
async function authMiddleware(ctx) {
    const { token } = ctx;
    if (!token) {
        throw new Error("Token não fornecido.");
    }
    const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const id = payload.id;
    if (!id) {
        throw new api_1.InvalidCredentials("ID do usuário não fornecido.");
    }
    try {
        const user = await userRepository_1.userRepository.findById(payload.id);
        if (!user) {
            throw new api_1.NotFound("Usuário não encontrado.");
        }
        ctx.user = user;
    }
    catch (error) {
        throw new Error("Token inválido ou expirado.");
    }
}
