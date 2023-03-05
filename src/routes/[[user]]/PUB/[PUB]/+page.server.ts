import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	const { user, PUB } = params

	if (user) {
		const userSender = await mainUser.findOne({ _id: new ObjectId(user) })
		console.log(userSender)
		if (!userSender) {
			return
		}
		const latestMessages: any = []
		const userReciever = await mainUser.findOne({ _id: new ObjectId(PUB) })
		console.log(userReciever)
		// if (!userReciever) {
		// 	const newUserReciever = await mainUser.insertOne({
		// 		name: PUB.replace(/\s/g, '')
		// 			.replace(/[^a-zA-Z0-9-]/g, '')
		// 			.toLowerCase(),
		// 	})

		// 	await groups.insertOne({ name: `${userSender.name};${PUB}`, allUsers: [userSender._id, newUserReciever.insertedId], nature: 'PUBLIC', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
		// 		await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: res.insertedId } })
		// 		await mainUser.updateOne({ _id: newUserReciever.insertedId }, { $push: { allGroups: res.insertedId } })
		// 	})
		// } else
		if (userReciever) {
			const findGroup = await groups.findOne({ name: `${userSender.name};${userReciever.name}` })
			const findSecondGroup = await groups.findOne({ name: `${userReciever.name};${userSender.name}` })

			if (!findGroup && !findSecondGroup) {
				await groups.insertOne({ name: `${userSender.name};${userReciever.name}`, allUsers: [userSender._id, userReciever._id], nature: 'PUBLIC', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
					await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: res.insertedId } })
					await mainUser.updateOne({ _id: userReciever._id }, { $push: { allGroups: res.insertedId } })
				})
			}
		}
		const userRecieverAgain = await mainUser.findOne({ _id: new ObjectId(user) })

		if (userRecieverAgain) {
			const returnData = await groups
				.aggregate([
					{ $match: { name: `${userRecieverAgain.name};${userSender.name}` } },
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

			if (returnData.length === 0) {
				const returnData = await groups
					.aggregate([
						{ $match: { name: `${userSender.name};${userRecieverAgain.name}` } },
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

			return {
				status: 200,
				body: {
					data: JSON.stringify(returnData[0]),
				},
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
}) as PageServerLoad
