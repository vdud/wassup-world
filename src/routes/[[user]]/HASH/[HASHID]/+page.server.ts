import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'

export const load = (async ({ params }) => {
	const { user, HASHID } = params
	const latestMessages: any = []

	const findUser = await mainUser.findOne({ name: user })
	if (findUser) {
		const findGroup = await groups.findOne({ name: HASHID, nature: 'HASHTAGS' })

		if (!findGroup) {
			await groups.insertOne({ name: HASHID, allUsers: [findUser._id], nature: 'HASHTAGS', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
				await mainUser.updateOne({ _id: findUser._id }, { $push: { allGroups: res.insertedId } })
			})
		}
	}

	// // JOIN GROUP ON VISIT //////////////////////////
	// const againFind = await groups.findOne({ name: HASHID, allUsers: findUser._id })
	// if (!againFind) {
	// 	await groups.updateOne({ name: HASHID }, { $push: { allUsers: findUser._id } })
	// }

	// const findGroupAgain = await groups.findOne({ name: HASHID })

	// if (findGroupAgain) {
	// 	const findUserLink = await mainUser.findOne({ _id: findUser._id, allGroups: findGroupAgain._id })

	// 	if (!findUserLink) {
	// 		await mainUser.updateOne({ _id: findUser._id }, { $push: { allGroups: findGroupAgain._id } })
	// 	}
	// }

	// const returnData = await groups.findOne({ name: HASHID })

	const returnData = await groups
		.aggregate([
			{ $match: { name: HASHID } },
			{
				$lookup: {
					from: 'user',
					localField: 'allUsers',
					foreignField: '_id',
					as: 'allUsers',
				},
			},
			// {
			// 	$lookup: {
			// 		from: 'messages',
			// 		localField: 'messages',
			// 		foreignField: '_id',
			// 		as: 'messages',
			// 	},
			// },
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

	console.log('returnData')
	console.log(returnData)

	return {
		status: 200,
		body: {
			data: JSON.stringify(returnData[0]),
		},
	}
}) as PageServerLoad
