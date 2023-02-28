import type { RequestHandler } from './$types'

import Pusher from 'pusher'
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
})

export const POST = (async ({ request }) => {
	const { data } = await request.json()
	console.log(data)

	pusher.trigger('channel-name', 'client-event-name', {
		message: data,
	})

	return new Response('success', {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		statusText: 'TMKC!',
	})
}) satisfies RequestHandler
