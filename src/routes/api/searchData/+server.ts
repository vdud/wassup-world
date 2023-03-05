import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { mainUser, groups } from '$db/collections'

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	console.log(data)
	// const searchUserData = {}
	// const searchGroupData = {}

	const searchUserData = await mainUser
		.aggregate([
			{
				$match: {
					name: { $regex: data, $options: 'i' },
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
					name: { $regex: data, $options: 'i' },
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
