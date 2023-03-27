// $like the post

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { mainUser, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

import Pusher from 'pusher'
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
})

export const POST = (async ({ request }) => {
	const { messageId, username_id, $userGroup_id } = await request.json()

	const user = await mainUser.findOne({ _id: new ObjectId(username_id) })

	if (!user) {
		return json({ success: false })
	}
	const findMessage = await massagesCreate.findOne({ _id: new ObjectId(messageId) })
	if (!findMessage) {
		return json({ success: false })
	}
	const findLikedUser = findMessage.likedPeople.find((person: any) => String(person) === String(user._id))
	if (findLikedUser) {
		await massagesCreate.updateOne({ _id: new ObjectId(messageId) }, { $inc: { likes: -1 }, $pull: { likedPeople: user._id } }, { upsert: true })
		pusher.trigger($userGroup_id, 'injectLike', {
			messageId: messageId,
			username_id: username_id,
			likes: findMessage.likes - 1,
		})

		return json({ success: true, isLiked: false, likes: findMessage.likes - 1 })
	} else {
		await massagesCreate.updateOne({ _id: new ObjectId(messageId) }, { $inc: { likes: 1 }, $addToSet: { likedPeople: user._id } }, { upsert: true })
		pusher.trigger($userGroup_id, 'injectLike', {
			messageId: messageId,
			username_id: username_id,
			likes: findMessage.likes + 1,
		})

		return json({ success: true, isLiked: true, likes: findMessage.likes + 1 })
	}
}) satisfies RequestHandler
