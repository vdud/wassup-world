// $like the post

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { groups, mainUser, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

export const POST = (async ({ request }) => {
	const { messageId, username_id } = await request.json()
	//
	const user = await mainUser.findOne({ _id: new ObjectId(username_id) })
	// const message = await massagesCreate.findOne({ _id: new ObjectId(messageId) })
	if (!user) {
		return json({ success: false })
	}

	const findLikedUser = await massagesCreate.findOne({ _id: new ObjectId(messageId), likedPeople: user._id })
	if (findLikedUser) {
		await massagesCreate.updateOne({ _id: new ObjectId(messageId) }, { $inc: { likes: -1 }, $pull: { likedPeople: user._id } }, { upsert: true })
		return json({ success: true, isLiked: false })
	} else {
		await massagesCreate.updateOne({ _id: new ObjectId(messageId) }, { $inc: { likes: 1 }, $addToSet: { likedPeople: user._id } }, { upsert: true })
		return json({ success: true, isLiked: true })
	}
}) satisfies RequestHandler
