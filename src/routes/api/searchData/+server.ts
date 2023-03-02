import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
	const { data } = await request.json();
	console.log('search-data');
	console.log(data);

	const searchUserData = await prisma.user.findMany({
		where: {
			name: {
				startsWith: data,
			},
		},
	});

	const searchGroupData = await prisma.groups.findMany({
		where: {
			name: {
				startsWith: data,
			},
			nature: 'HASHTAGS',
		},
	});

	return json({ success: true, data: { searchUserData, searchGroupData } });
}) satisfies RequestHandler;
