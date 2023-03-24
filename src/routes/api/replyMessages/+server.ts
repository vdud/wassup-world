import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

import { mainUser, massagesCreate, groups } from '$db/collections'
import { ObjectId } from 'mongodb'

import Pusher from 'pusher'
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
})

export const POST = (async ({ request }) => {
	const { message, $userGroup_id, $userName, $userName_id, $messageId } = await request.json()

	return json({ success: true })
}) satisfies RequestHandler
