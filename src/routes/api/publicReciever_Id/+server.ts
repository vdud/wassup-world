import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { mainUser } from '$db/collections'

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	const publicReciever_Id = data

	const reciever = await mainUser.findOne({ name: publicReciever_Id })

	if (!reciever) {
		const newUser = await mainUser.insertOne({ name: publicReciever_Id, allGroups: [] })
		return json({ success: true, publicReciever_Id: newUser.insertedId })
	}
	return json({ success: true, publicReciever_Id: reciever._id })
}) satisfies RequestHandler
