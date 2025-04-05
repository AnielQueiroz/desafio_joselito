"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = getProfileController;
const userRepository_1 = require("../repositories/userRepository");
async function getProfileController(id) {
    if (!id) {
        throw new Error("ID do usuário nao fornecido.");
    }
    const userProfile = await userRepository_1.userRepository.findById(id);
    if (!userProfile) {
        throw new Error("Usuário nao encontrado.");
    }
    return userProfile;
}
;
