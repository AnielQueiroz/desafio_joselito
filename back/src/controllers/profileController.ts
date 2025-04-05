import { userRepository } from "../repositories/userRepository";

export async function getProfileController(id: string) {
    if (!id) {
        throw new Error("ID do usuário nao fornecido.");
    }
    
    const userProfile = await userRepository.findById(id);
    if (!userProfile) {
        throw new Error("Usuário nao encontrado.");
    }

    return userProfile;
};