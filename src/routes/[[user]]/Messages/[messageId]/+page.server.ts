import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	console.log('params', params.messageId)
	// if (!params.user) {
	const findMessage = await massagesCreate.findOne({ _id: new ObjectId(params.messageId) })

	if (findMessage) {
		console.log('findMesage', findMessage)
		return {
			status: 200,
			body: {
				data: JSON.stringify(findMessage),
			},
		}
	}
	// }

	return {
		status: 200,
		body: {
			data: JSON.stringify(params),
		},
	}
}) satisfies PageServerLoad
