import Pusher from '@pusher/push-notifications-server'

const pusher = new Pusher({
	instanceId: 'c9d50f68-33d2-4426-8a8d-2e82f0b778e7',
	secretKey: 'E3F572CCE3E70A9F18E3CC2177838E5475DD90F8C5974080129844EEBC0968E6',
})

export default pusher
