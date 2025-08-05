import { PrismaClient } from '@prisma/client';
export const prismaClient = global.prisma ||
    new PrismaClient({
        log: ['query'],
    });
if (process.env.NODE_ENV !== 'production')
    global.prisma = prismaClient;
//# sourceMappingURL=prismaClient.js.map