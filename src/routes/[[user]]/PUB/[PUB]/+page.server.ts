import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	const { user, PUB } = params

	console.log(user)
	console.log(PUB)

	if (user) {
		const userSender = await mainUser.findOne({ _id: new ObjectId(user) })
		const userReciever = await mainUser.findOne({ _id: new ObjectId(PUB) })

		if (!userSender || !userReciever) {
			return
		}

		const findFirstGroup = await groups.findOne({ name: `${userSender.name};${userReciever.name}` })
		const findSecondGroup = await groups.findOne({ name: `${userReciever.name};${userSender.name}` })

		if (!findFirstGroup && !findSecondGroup) {
			const newGroup = await groups.insertOne({
				name: `${userSender.name};${userReciever.name}`,
				allUsers: [userSender._id, userReciever._id],
				nature: 'PUBLIC',
				createdAt: new Date(),
				updatedAt: new Date(),
			})

			await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: newGroup.insertedId } })
			await mainUser.updateOne({ _id: userReciever._id }, { $push: { allGroups: newGroup.insertedId } })

			const returnData = await groups
				.aggregate([
					{ $match: { _id: newGroup.insertedId } },
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
		} else if (findFirstGroup) {
			const returnData = await groups
				.aggregate([
					{ $match: { _id: findFirstGroup._id } },
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
		} else if (findSecondGroup) {
			const returnData = await groups
				.aggregate([
					{ $match: { _id: findSecondGroup._id } },
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
	}

	if (!user) {
		const returnData = await groups
			.aggregate([
				{ $match: { name: PUB, nature: 'PUBLIC' } },
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
}) as PageServerLoad
