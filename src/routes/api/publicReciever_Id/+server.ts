import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { mainUser } from '$db/collections'

export const POST = (async ({ request }) => {
	const { searchInput } = await request.json()
	const recieverName = searchInput

	const reciever = await mainUser.findOne({ name: recieverName })

	if (!reciever) {
		const newUser = await mainUser.insertOne({ name: recieverName, allGroups: [] })
		return json({ success: true, publicReciever_Id: newUser.insertedId })
	}
	return json({ success: true, publicReciever_Id: reciever._id })
}) satisfies RequestHandler
