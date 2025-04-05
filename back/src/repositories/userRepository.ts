import { db } from "../lib/prisma";

export const userRepository = {
    async findByEmail(email: string) {
        return db.user.findUnique({
            where: { email },
        })
    },
    async findById(id: string) {
        return db.user.findUnique({
            where: { id }
        })
    },
    async create(data: { name: string; email: string; password: string }) {
        return db.user.create({
            data
        });
    },
}