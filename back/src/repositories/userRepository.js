"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const prisma_1 = require("../lib/prisma");
exports.userRepository = {
    async findByEmail(email) {
        return prisma_1.db.user.findUnique({
            where: { email },
        });
    },
    async findById(id) {
        return prisma_1.db.user.findUnique({
            where: { id }
        });
    },
    async create(data) {
        return prisma_1.db.user.create({
            data
        });
    },
};
