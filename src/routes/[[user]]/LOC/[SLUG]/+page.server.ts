import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const load = (async ({ params }) => {
	const { user, SLUG } = params;
	const latestMessages: any = [];

	console.log(user, SLUG);

	const findGroup = await prisma.groups.findMany({
		where: {
			name: {
				startsWith: SLUG,
			},
			nature: 'LOCATIONS',
		},
	});

	if (findGroup.length === 0) {
		if (user != undefined) {
			const findUID = await prisma.user.findMany({
				where: {
					name: {
						startsWith: user,
					},
				},
			});
			if (findUID.length != 0) {
				const newGroup = await prisma.groups.create({
					data: {
						name: SLUG,
						nature: 'LOCATIONS',
					},
					include: {
						allUsers: true,
					},
				});

				await prisma.allUsers.create({
					data: {
						group: {
							connect: {
								id: newGroup.id,
							},
						},
						user: {
							connect: {
								id: findUID[0].id,
							},
						},
					},
				});
			}
		}
	} else {
		if (user != undefined) {
			const findUID = await prisma.user.findMany({
				where: {
					name: {
						startsWith: user,
					},
				},
			});
			if (findUID.length != 0) {
				const findIfAlreadyU2GConnected = await prisma.allUsers.findMany({
					where: {
						userId: findUID[0].id,
						groupId: findGroup[0].id,
					},
				});

				if (findIfAlreadyU2GConnected.length === 0) {
					await prisma.allUsers.create({
						data: {
							group: {
								connect: {
									id: findGroup[0].id,
								},
							},
							user: {
								connect: {
									id: findUID[0].id,
								},
							},
						},
					});
				}
			}
		}
	}
	const foundGroup = await prisma.groups.findFirst({
		where: {
			name: SLUG,
		},
		include: {
			allUsers: {
				include: {
					user: true,
				},
			},

			message: {
				take: 10,
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	console.log(foundGroup);

	return {
		status: 200,
		body: {
			data: foundGroup,
		},
	};
}) as PageServerLoad;
