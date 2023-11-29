import prisma from '$lib/prisma';

export async function load() {
	const logs = await prisma.log.findMany();
	return { logs };
}
