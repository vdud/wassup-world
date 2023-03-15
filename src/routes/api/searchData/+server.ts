import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { mainUser, groups } from '$db/collections'

export const POST = (async ({ request }) => {
	const { searchInputData } = await request.json()
	// console.log(searchInputData)
	// const searchUserData = {}
	// const searchGroupData = {}

	const searchUserData = await mainUser
		.aggregate([
			{
				$match: {
					name: { $regex: searchInputData, $options: 'i' },
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
				},
			},
			{
				$limit: 5,
			},
		])
		.toArray()

	const searchGroupData = await groups
		.aggregate([
			{
				$match: {
					name: { $regex: searchInputData, $options: 'i' },
					nature: 'HASHTAGS',
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
				},
			},
			{
				$limit: 5,
			},
		])
		.toArray()

	return json({ success: true, data: { searchUserData, searchGroupData } })
}) satisfies RequestHandler
