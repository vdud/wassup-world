import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'

export const load = (async ({ params }) => {
	const { user, PUB } = params

	if (user) {
		const userSender = await mainUser.findOne({ name: user })
		if (!userSender) {
			return
		}
		const latestMessages: any = []
		const userReciever = await mainUser.findOne({ name: PUB })
		if (!userReciever) {
			await mainUser.insertOne({ name: PUB, createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
				await groups.insertOne({ name: `${userSender.name};${PUB}`, allUsers: [userSender._id, res.insertedId], nature: 'PUBLIC', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
					await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: res.insertedId } })
					await mainUser.updateOne({ _id: res.insertedId }, { $push: { allGroups: res.insertedId } })
				})
			})
		} else {
			const findGroup = await groups.findOne({ name: `${userSender.name};${userReciever.name}` })

			if (!findGroup) {
				await groups.insertOne({ name: `${userSender.name};${userReciever.name}`, allUsers: [userSender._id, userReciever._id], nature: 'PUBLIC', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
					await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: res.insertedId } })
					await mainUser.updateOne({ _id: userReciever._id }, { $push: { allGroups: res.insertedId } })
				})
			}
		}
	}

	const returnData = await groups
		.aggregate([
			{ $match: { name: PUB } },
			{
				$lookup: {
					from: 'user',
					localField: 'allUsers',
					foreignField: '_id',
					as: 'allUsers',
				},
			},
			{
				$project: {
					_id: 0,
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
}) as PageServerLoad
