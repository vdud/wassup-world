// $searchInput

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { groups, mainUser } from '$db/collections'
import { ObjectId } from 'mongodb'

export const POST = (async ({ request }) => {
	const { loc, $userName_id } = await request.json()

	const mainUserFind = await mainUser.findOne({ _id: new ObjectId($userName_id) })

	if (mainUserFind) {
		const hashGroup = await groups.findOne({ name: loc, nature: 'LOCATIONS' })

		if (!hashGroup) {
			// const newGroup = await groups.insertOne({ name: loc, allUsers: [userName._id], nature: 'LOCATIONS', createdAt: new Date(), updatedAt: new Date() })
			const newGroup = await groups.insertOne({ name: loc, allUsers: [$userName_id], nature: 'LOCATIONS', createdAt: new Date(), updatedAt: new Date() })

			return json({ success: true, locGroup_Id: newGroup.insertedId })
		} else if (hashGroup) {
			await groups.updateOne({ _id: hashGroup._id }, { $addToSet: { allUsers: $userName_id } })
			return json({ success: true, locGroup_Id: hashGroup._id })
		}
	}
	return json({ success: false, locGroup_Id: 'oops' })
}) satisfies RequestHandler
