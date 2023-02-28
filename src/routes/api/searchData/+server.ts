import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	console.log('search-data')
	console.log(data)

	return json({ success: true, data })
}) satisfies RequestHandler
