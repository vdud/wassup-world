import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	// console.log('params', params.messageId)
	// if (!params.user) {
	const findMessage = await massagesCreate.findOne({ _id: new ObjectId(params.messageId) })

	const returnRepliesData = await massagesCreate
		.find({ replyTo: new ObjectId(params.messageId) })
		// .sort({ createdAt: -1 })
		.sort({ likes: -1 })
		.toArray()

	//sort by likes

	//aggregate
	if (!findMessage || !returnRepliesData) {
		return
	}
	console.log('returnMsgReplyData', returnRepliesData)
	console.log('findMesage', findMessage)
	return {
		status: 200,
		body: {
			data: JSON.stringify(findMessage),
			replyData: JSON.stringify(returnRepliesData),
		},
	}

	// }
}) satisfies PageServerLoad
