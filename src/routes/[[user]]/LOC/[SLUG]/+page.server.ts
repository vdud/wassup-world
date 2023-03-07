import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	const { user, SLUG } = params
	const latestMessages: any = []

	if (user) {
		const findUser = await mainUser.findOne({ _id: new ObjectId(user) })
		console.log(findUser)
		if (findUser) {
			const findGroup = await groups.findOne({ _id: new ObjectId(SLUG) })
			if (findGroup) {
				// const findUserLink = await mainUser.findOne({ _id: findUser._id, allGroups: findGroup._id })
				const findUserLink = await mainUser.findOne({ _id: findUser._id, allGroups: { $in: [findGroup._id] } })

				if (!findUserLink) {
					await mainUser.updateOne({ _id: findUser._id }, { $push: { allGroups: findGroup._id } })
				}

				const returnData = await groups
					.aggregate([
						{ $match: { _id: new ObjectId(SLUG) } },
						{
							$lookup: {
								from: 'user',
								localField: 'allUsers',
								foreignField: '_id',
								as: 'allUsers',
							},
						},
						{
							$lookup: {
								from: 'messages',
								localField: 'messages',
								foreignField: '_id',
								as: 'messages',
							},
						},
						{
							$project: {
								_id: 1,
								name: 1,
								messages: 1,
								allUsers: {
									_id: 1,
									name: 1,
								},
							},
						},
					])
					.toArray()

				return {
					status: 200,
					body: {
						data: JSON.stringify(returnData[0]),
					},
				}
			}
		}
	} else {
		const returnData = await groups
			.aggregate([
				{ $match: { name: SLUG, nature: 'LOCATIONS' } },
				{
					$lookup: {
						from: 'user',
						localField: 'allUsers',
						foreignField: '_id',
						as: 'allUsers',
					},
				},
				{
					$lookup: {
						from: 'messages',
						localField: 'messages',
						foreignField: '_id',
						as: 'messages',
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						messages: 1,
						allUsers: {
							_id: 1,
							name: 1,
						},
					},
				},
			])
			.toArray()

		return {
			status: 200,
			body: {
				data: JSON.stringify(returnData[0]),
			},
		}
	}
}) as PageServerLoad
