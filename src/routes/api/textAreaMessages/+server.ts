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
	const { message, $userGroup_id, $userName, $userName_id } = await request.json()
	// console.log('$userGroup_id', $userGroup_id)
	// console.log('$userName_id', $userName_id)
	// console.log('$userName', $userName)

	pusher.trigger($userGroup_id, 'inserted_Put', {
		message: message,
		sender: $userName,
		createdAt: new Date(),
		groupId: $userGroup_id,
	})

	const findUser = await mainUser.findOne({ _id: new ObjectId($userName_id) })
	const findGroup = await groups.findOne({ _id: new ObjectId($userGroup_id) })

	// console.log('findGroup', findGroup)
	// console.log('findUser', findUser)

	if (!findUser || !findGroup) {
		return json({ success: false })
	}

	const newMessage = await massagesCreate.insertOne({
		sender: $userName,
		message: message,
		group_id: new ObjectId($userGroup_id),
		createdAt: new Date(),
	})

	if (findGroup.nature === 'PUBLIC') {
		const findUserInGroup = await groups.findOne({ _id: new ObjectId($userGroup_id), allUsers: new ObjectId($userName_id) })
		if (!findUserInGroup) {
			await groups.updateOne({ _id: new ObjectId($userGroup_id) }, { $set: { name: `${$userName};${findGroup.name}`, lastMessage: message.slice(0, 48), latestMessageSender: $userName, updatedAt: new Date() }, $addToSet: { allUsers: new ObjectId($userName_id), messages: newMessage.insertedId } }, { upsert: true })
			await mainUser.updateOne({ _id: new ObjectId($userName_id) }, { $addToSet: { allGroups: new ObjectId($userGroup_id) } })
		} else {
			await groups.updateOne({ _id: new ObjectId($userGroup_id) }, { $set: { lastMessage: message.slice(0, 48), latestMessageSender: $userName, updatedAt: new Date() }, $addToSet: { allUsers: new ObjectId($userName_id), messages: newMessage.insertedId } }, { upsert: true })
			await mainUser.updateOne({ _id: new ObjectId($userName_id) }, { $addToSet: { allGroups: new ObjectId($userGroup_id) } })
		}
	} else if (findGroup.nature === 'LOCATIONS' || findGroup.nature === 'HASHTAGS') {
		// const updateGroup = await groups.updateOne({ _id: new ObjectId($userGroup_id) }, { $set: { lastMessage: message.slice(0, 48), updatedAt: new Date() }, $push: { messages: newMessage.insertedId, allUsers } }, { upsert: true })
		await groups.updateOne({ _id: new ObjectId($userGroup_id) }, { $set: { lastMessage: message.slice(0, 48), latestMessageSender: $userName, updatedAt: new Date() }, $addToSet: { allUsers: new ObjectId($userName_id), messages: newMessage.insertedId } }, { upsert: true })
		await mainUser.updateOne({ _id: new ObjectId($userName_id) }, { $addToSet: { allGroups: new ObjectId($userGroup_id) } })
	}

	return json({ success: true })
}) satisfies RequestHandler
