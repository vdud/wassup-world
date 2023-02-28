import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	const userName = data
	console.log('login-data')
	console.log(userName)

	// Prisma Client
	const findUser = await prisma.user.findUnique({
		where: {
			name: userName,
		},
		include: {
			allGroups: true,
			messages: true,
			ownedGroups: true,
		},
	})
	console.log(findUser)

	if (!findUser) {
		const createAcc = await prisma.user.create({
			data: {
				name: userName,
			},
		})
		return json({ success: true, data: createAcc })
	} else {
		return json({ success: true, data: findUser })
	}
}) satisfies RequestHandler
