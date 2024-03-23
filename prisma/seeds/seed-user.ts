import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	const password = await hash('Bang@123', 12);
	const user = await prisma.user.upsert({
		where: { email: 'tajbink@gmail.com' },
		update: {
			password,
		},
		create: {
			email: 'tajbink@gmail.com',
			name: 'Admin',
			password,
		},
	});
	console.log({ user });
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
