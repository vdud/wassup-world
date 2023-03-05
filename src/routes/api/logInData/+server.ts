import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { mainUser } from '$db/collections'

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	const userName = data

	const findUser = await mainUser.findOne({ name: userName })
	if (!findUser) {
		const newUser = await mainUser.insertOne({ name: userName, allGroups: [] })
		return json({ success: true, userName_id: newUser.insertedId, data: { formatedPUBLICdata: [], formatedHASHTAGSdata: [], formatedLOCdata: [] } })
	} else {
		const formattedUserData = await mainUser
			.aggregate([
				{ $match: { _id: findUser._id } },
				{
					$lookup: {
						from: 'groups',
						localField: 'allGroups',
						foreignField: '_id',
						as: 'allGroups',
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						allGroups: {
							_id: 1,
							name: 1,
							nature: 1,
							latestMessage: 1,
							updatedAt: 1,
						},
					},
				},
				{
					$unwind: '$allGroups',
				},
				{
					$sort: {
						'allGroups.updatedAt': -1,
					},
				},
				{
					$group: {
						_id: '$_id',
						name: { $first: '$name' },
						allGroups: { $push: '$allGroups' },
					},
				},
			])
			.toArray()

		console.log(formattedUserData)

		const formatedPUBLICdata = () => {
			if (formattedUserData.length === 0) {
				return []
			}
			const publicData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'PUBLIC')
			return publicData
		}

		const formatedHASHTAGSdata = () => {
			if (formattedUserData.length === 0) {
				return []
			}
			const hashtagsData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'HASHTAGS')
			return hashtagsData
		}

		const formatedLOCdata = () => {
			if (formattedUserData.length === 0) {
				return []
			}
			const locData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'LOCATIONS')
			return locData
		}

		return json({ success: true, userName_id: findUser._id, data: { formatedPUBLICdata: formatedPUBLICdata(), formatedHASHTAGSdata: formatedHASHTAGSdata(), formatedLOCdata: formatedLOCdata() } })
		// return json({ success: true, data: formattedUserData[0] })
	}
}) satisfies RequestHandler
