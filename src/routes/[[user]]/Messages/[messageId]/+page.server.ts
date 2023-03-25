import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	const { user, messageId } = params
	// if (!user) {
	if (messageId) {
		const findMessage = await massagesCreate.findOne({ _id: new ObjectId(messageId) })

		if (findMessage) {
			const returnRepliesData = await massagesCreate
				.find({ replyTo: new ObjectId(messageId) })
				// .sort({ createdAt: -1 })
				.sort({ likes: -1 })
				.limit(100)
				.toArray()

			//sort by likes
			if (returnRepliesData) {
				// returnRepliesData.sort((a, b) => {
				// 	return b.likes - a.likes
				// })
				return {
					status: 200,
					body: {
						message: JSON.stringify(findMessage),
						replyData: JSON.stringify(returnRepliesData),
					},
				}
			}
		}
	}
}) satisfies PageServerLoad
