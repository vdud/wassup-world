import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
	const { data } = await request.json();
	const userName = data;
	console.log('login-data');
	console.log(userName);

	// Prisma Client
	const findUser = await prisma.user.findUnique({
		where: {
			name: userName,
		},
		include: {
			allGroups: {
				select: {
					group: {
						include: {
							message: {
								take: 1,
								orderBy: {
									createdAt: 'desc',
								},
							},
						},
					},
				},
			},
		},
	});

	// const filterGrouopData = findUser.allGroups.group.message.filter((group: any) => {
	// 	group.length > 0;
	// });
	// console.log('filterGrouopData');
	// console.log(filterGrouopData);
	// console.log(filterGrouopData);

	if (!findUser) {
		const createAcc = await prisma.user.create({
			data: {
				name: userName,
			},
			include: {
				allGroups: true,
			},
		});
		return json({ success: true, data: createAcc });
	}
	console.log(findUser);

	return json({ success: true, data: findUser });
}) satisfies RequestHandler;
