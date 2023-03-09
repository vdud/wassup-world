import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

import { mainUser, massagesCreate, groups } from '$db/collections'
import { ObjectId } from 'mongodb'

import Pusher from 'pusher'
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
})

export const POST = (async ({ request }) => {
	const { message, $canSendReciever, $userGroup_id, $userName } = await request.json()

	pusher.trigger($canSendReciever, 'inserted', {
		message: message,
		sender: $userName,
	})
	pusher.trigger($userGroup_id, 'inserted_Put', {
		message: message,
		sender: $userName,
	})

	const newMessage = await massagesCreate.insertOne({
		sender: $userName,
		message: message,
		group_id: new ObjectId($userGroup_id),
		createdAt: new Date(),
	})

	const updateGroup = await groups.updateOne({ _id: new ObjectId($userGroup_id) }, { $set: { lastMessage: message.slice(0, 48), updatedAt: new Date() }, $push: { messages: newMessage.insertedId } }, { upsert: true })

	return json({ success: true })
}) satisfies RequestHandler
