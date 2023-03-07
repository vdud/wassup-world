// $searchInput

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { groups, mainUser } from '$db/collections'
import { ObjectId } from 'mongodb'

export const POST = (async ({ request }) => {
	const { $searchInput, $userName_id } = await request.json()
	const mainUserFind = await mainUser.findOne({ _id: new ObjectId($userName_id) })

	if (mainUserFind) {
		const hashGroup = await groups.findOne({ name: $searchInput, nature: 'HASHTAGS' })

		if (!hashGroup) {
			const newGroup = await groups.insertOne({ name: $searchInput, allUsers: [mainUserFind._id], nature: 'HASHTAGS', createdAt: new Date(), updatedAt: new Date() })

			return json({ success: true, hashtagGroup_Id: newGroup.insertedId })
		} else if (hashGroup) {
			await groups.updateOne({ _id: hashGroup._id }, { $addToSet: { allUsers: mainUserFind._id } })
			return json({ success: true, hashtagGroup_Id: hashGroup._id })
		}
	}
	if (!mainUserFind) {
		return json({ success: false, hashtagGroup_Id: 'User not found' })
	}
	return json({ success: false, hashtagGroup_Id: 'oops' })
}) satisfies RequestHandler
