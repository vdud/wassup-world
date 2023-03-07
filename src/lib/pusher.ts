// import Pusher from "pusher-js"
import Pusher from 'pusher-js'

// Initialize Channels client
export const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
	cluster: import.meta.env.VITE_APP_CLUSTER,
})
Pusher.logToConsole = true
// Subscribe to the appropriate channel
const channel = pusher.subscribe('channel-name')

export const success = 'success-true'

// // Bind a callback function to an event within the subscribed channel
channel.bind('client-event-name', function (data: any) {
	// Do what you wish with the data from the event
	console.log(data)
})

export async function pushData(data: any) {
	console.log('pushData')

	const res = await fetch('/api/channels-events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data }),
	})

	if (!res.ok) {
		console.error('failed to push data')
	}
}
