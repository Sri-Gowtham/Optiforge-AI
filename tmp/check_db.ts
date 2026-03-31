import prisma from './backend/src/prisma/client';

async function checkUsers() {
    try {
        const users = await prisma.user.findMany();
        console.log('Users in DB:', users);
    } catch (error) {
        console.error('Error connecting to DB:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUsers();
