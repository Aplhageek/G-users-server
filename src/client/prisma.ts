import { PrismaClient, User } from '@prisma/client'
export const prismaClient = new PrismaClient()


async function testFindMany() {
    const username = 'AlphaGeek';
    try {
        // const user = await prismaClient.user.findUnique({ where: { username } });
        const user = await prismaClient.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive',
                },
            },
        });
        console.log("User found:", user);
    } catch (error) {
        console.error("Error during testFindUnique:", error);
    } finally {
        await prismaClient.$disconnect();
    }
}

testFindMany()