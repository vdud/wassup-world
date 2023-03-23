//////////////////////NOT IMPLEMENTED YET////////////////////

import { pusher } from '$lib/bigFunctions/pusher'
import Pusher from 'pusher-js'
import { applyNavDataMessage, applyNewMessage } from './applyTextMessage'

export const unLockBby = async (data: any) => {
	console.log('data', data)
	if (data.$userName.length < 3 || data.$userName.length > 18 || data.$userName.toString().trim() == '' || data.$userName == ' ') {
		return
	}
	const $userName = data.$userName
	localStorage.setItem('formData', JSON.stringify({ $userName }))

	if (data.$userName != '') {
		const res = await fetch('/api/logInData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: $userName }),
		})
		const response = await res.json()
		console.log('response', response)
		if (res.ok) {
			data.$loginResponseData = response
			data.$userName_id = response.userName_id

			pusher.subscribe(data.$userName_id).bind('newPubMessage', (data: any) => {
				applyNewMessage({ groupName: data.groupName, sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
				// console.log('triggered')
			})

			data.$loginResponseData.data.formatedHASHTAGSdata.forEach((element: any) => {
				if (data.$userGroup_id != element._id) {
					pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
						applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'HASHTAGS' })
					})
				}
			})
			data.$loginResponseData.data.formatedLOCdata.forEach((element: any) => {
				if (data.$userGroup_id != element._id) {
					pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
						applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'LOCATIONS' })
					})
				}
			})

			data.$loginResponseData.data.formatedPUBLICdata.forEach((element: any) => {
				if (data.$userGroup_id != element._id) {
					pusher.subscribe(element._id).bind('injectMessage', (data: any) => {
						applyNavDataMessage({ sender: data.sender, message: data.message, createdAt: data.createdAt, groupId: data.groupId, nature: 'PUBLIC' })
					})
				}
			})

			//unlock
			data.$isLocked = false
		} else if (!res.ok) {
			alert(response.message)
			// $canSend = false
		}
	}
}
