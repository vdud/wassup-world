import { json } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { mainUser, groups } from '$db/collections'

export const load = (async ({ params }) => {
	const { user, SLUG } = params
	console.log('user', user)

	if (user) {
		const findUser = await mainUser.findOne({ name: user })
		if (!findUser) {
			return
		}
		const latestMessages: any = []

		const findGroup = await groups.findOne({ name: SLUG })
		if (!findGroup) {
			await groups.insertOne({ name: SLUG, allUsers: [findUser._id], nature: 'LOCATIONS', createdAt: new Date(), updatedAt: new Date() }).then(async (res) => {
				await mainUser.updateOne({ _id: findUser._id }, { $push: { allGroups: res.insertedId } })
			})
		}

		const againFind = await groups.findOne({ name: SLUG, allUsers: findUser._id })
		if (!againFind) {
			await groups.updateOne({ name: SLUG }, { $push: { allUsers: findUser._id } })
		}

		const findGroupAgain = await groups.findOne({ name: SLUG })

		if (findGroupAgain) {
			const findUserLink = await mainUser.findOne({ _id: findUser._id, allGroups: findGroupAgain._id })

			if (!findUserLink) {
				await mainUser.updateOne({ _id: findUser._id }, { $push: { allGroups: findGroupAgain._id } })
			}
		}
	}

	// const returnData = await groups.findOne({ name: SLUG })
	const returnData = await groups
		.aggregate([
			{ $match: { name: SLUG } },
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
