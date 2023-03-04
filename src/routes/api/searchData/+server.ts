import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	console.log(data)
	const searchUserData = {}
	const searchGroupData = {}

	return json({ success: true, data: { searchUserData, searchGroupData } })
}) satisfies RequestHandler
