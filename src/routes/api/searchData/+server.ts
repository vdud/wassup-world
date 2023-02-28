import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
let envTitle = import.meta.env.VITE_APP_TITLE

export const POST = (async ({ request }) => {
	// console.log('server.ts')
	// const { $searchInput } = await request.json()

	const { data } = await request.json()
	console.log('data')
	console.log(data)

	return json({ success: true, data, envTitle })
}) satisfies RequestHandler
