import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups, massagesCreate } from '$db/collections'
import { ObjectId } from 'mongodb'

export const load = (async ({ params }) => {
	const { user, PUB } = params

	// console.log(user)
	// console.log(PUB)

	if (user) {
		const userSender = await mainUser.findOne({ _id: new ObjectId(user) })
		const userReciever = await mainUser.findOne({ _id: new ObjectId(PUB) })
		// console.log('userSender', userSender)
		// console.log('userReciever', userReciever)
		if (!userSender || !userReciever) {
			return
		}

		const findFirstGroup = await groups.findOne({ name: `${userSender.name};${userReciever.name}`, nature: 'PUBLIC' })
		const findSecondGroup = await groups.findOne({ name: `${userReciever.name};${userSender.name}`, nature: 'PUBLIC' })
		// console.log('findFirstGroup', findFirstGroup)
		// console.log('findSecondGroup', findSecondGroup)

		if (!findFirstGroup && !findSecondGroup) {
			const newGroup = await groups.insertOne({
				name: `${userSender.name};${userReciever.name}`,
				allUsers: [userSender._id, userReciever._id],
				nature: 'PUBLIC',
				createdAt: new Date(),
				updatedAt: new Date(),
				messages: [],
			})

			await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: newGroup.insertedId } })
			await mainUser.updateOne({ _id: userReciever._id }, { $push: { allGroups: newGroup.insertedId } })

			// console.log('newGroup', newGroup)

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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: newGroup.insertedId } },
					{
						$project: {
							_id: 1,
							message: 1,
							createdAt: 1,
							sender: 1,
						},
					},
				])
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray()

			return {
				status: 200,
				body: {
					data: JSON.stringify(returnData[0]),
					messages: JSON.stringify(returnMsgData),
					groupId: JSON.stringify(newGroup.insertedId),
					groupName: `${userSender.name};${userReciever.name}`,
					createdAt: new Date(),
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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findFirstGroup._id } },
					{
						$project: {
							_id: 1,
							message: 1,
							createdAt: 1,
							sender: 1,
						},
					},
				])
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray()

			return {
				status: 200,
				body: {
					data: JSON.stringify(returnData[0]),
					messages: JSON.stringify(returnMsgData),
					groupId: JSON.stringify(findFirstGroup._id),
					groupName: findFirstGroup.name,
					createdAt: findFirstGroup.createdAt,
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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findSecondGroup._id } },
					{
						$project: {
							_id: 1,
							message: 1,
							createdAt: 1,
							sender: 1,
						},
					},
				])
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray()

			return {
				status: 200,
				body: {
					data: JSON.stringify(returnData[0]),
					messages: JSON.stringify(returnMsgData),
					groupId: JSON.stringify(findSecondGroup._id),
					groupName: findSecondGroup.name,
					createdAt: findSecondGroup.createdAt,
				},
			}
		}
	}

	// if (!user) {
	const findGroup = await groups.findOne({ name: PUB, nature: 'PUBLIC' })
	// console.log('findGroup', findGroup)

	if (findGroup) {
		const returnData = await groups
			.aggregate([
				{ $match: { _id: findGroup._id } },
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

		const returnMsgData = await massagesCreate
			.aggregate([
				{ $match: { group_id: findGroup._id } },
				{
					$project: {
						_id: 1,
						message: 1,
						createdAt: 1,
						sender: 1,
					},
				},
			])
			.sort({ createdAt: -1 })
			.limit(100)
			.toArray()

		// console.log('findGroup._id', findGroup._id.toString())

		return {
			status: 200,
			body: {
				data: JSON.stringify(returnData[0]),
				messages: JSON.stringify(returnMsgData),
				groupId: JSON.stringify(findGroup._id),
				groupName: findGroup.name,
				createdAt: findGroup.createdAt,
			},
		}
	}
	// }
}) as PageServerLoad
