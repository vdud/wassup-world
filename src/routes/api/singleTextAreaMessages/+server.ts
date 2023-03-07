import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

import Pusher from 'pusher'
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
})

export const POST = (async ({ request }) => {
	const { message, $canSendReciever, $userGroup_id } = await request.json()

	console.log(message)
	console.log($canSendReciever)
	console.log($userGroup_id)

	pusher.trigger($canSendReciever, 'inserted', {
		message: message,
	})
	pusher.trigger($userGroup_id, 'inserted_Put', {
		message: message,
	})

	return json({ success: true })
}) satisfies RequestHandler
