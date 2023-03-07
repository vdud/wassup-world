// $searchInput

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { groups, mainUser } from '$db/collections'
import { ObjectId } from 'mongodb'

export const POST = (async ({ request }) => {
	const { $searchInput, $userName_id } = await request.json()

	const mainUserFind = await mainUser.findOne({ _id: new ObjectId($userName_id) })

	if (mainUserFind) {
		const hashGroup = await groups.findOne({ name: $searchInput, nature: 'LOCATIONS' })

		if (!hashGroup) {
			// const newGroup = await groups.insertOne({ name: $searchInput, allUsers: [userName._id], nature: 'LOCATIONS', createdAt: new Date(), updatedAt: new Date() })
			const newGroup = await groups.insertOne({ name: $searchInput, allUsers: [$userName_id], nature: 'LOCATIONS', createdAt: new Date(), updatedAt: new Date() })

			return json({ success: true, $searchInput: newGroup.insertedId })
		} else {
			return json({ success: true, $searchInput: hashGroup._id })
		}
	} else {
		return json({ success: false, $searchInput: 'User not found' })
	}
}) satisfies RequestHandler
