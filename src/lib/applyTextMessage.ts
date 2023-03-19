import { timeSince } from './timeFormat'

export const applyMessageYoMe = (data: any) => {
	// if (sender !== $userName) {
	const textMessages: any = document.getElementById('textMessages')

	const div = document.createElement('div')
	div.classList.add('text')
	// div.classList.add('newText')
	div.classList.add('yoMe')
	const p = document.createElement('p')
	const span1 = document.createElement('span')
	span1.style.color = 'var(--secondary)'
	span1.innerText = data.sender + '; '
	const span2 = document.createElement('span')
	span2.style.color = 'var(--secondaryThemeInverted)'
	span2.innerText = data.message

	const span3 = document.createElement('span')
	span3.classList.add('spanFlexRight')

	const span4 = document.createElement('span')
	span4.classList.add('timeSpan')
	span4.innerText = timeSince(data.createdAt)
	span3.append(span4)

	//LIKE BUTTON
	const span5 = document.createElement('span')
	span5.classList.add('timeSpan')
	span5.classList.add('likeSPan')
	span5.style.marginLeft = '10px'
	// span3.append(span5) //not yet implemented the like button

	p.appendChild(span1)
	p.appendChild(span2)
	p.appendChild(span3)
	div.appendChild(p)

	textMessages.appendChild(div)
}

export const applyNavDataMessage = (data: any) => {
	const senderWho = document.getElementById(`SENDER?${data.groupId}`)
	const latestMessage = document.getElementById(`LM?${data.groupId}`)
	const latestMessageTime = document.getElementById(`LMT?${data.groupId}`)
	const groupLocBox = document.getElementById(`locBox?${data.groupId}`)

	if (!senderWho || !latestMessage || !latestMessageTime || !groupLocBox) {
		return
	}

	if (data.nature === 'HASHTAGS') {
		groupLocBox.classList.add('locBoxHashNotification')
	} else if (data.nature === 'LOCATIONS') {
		groupLocBox.classList.add('locBoxLocationNotification')
	} else if (data.nature === 'PUBLIC') {
		groupLocBox.classList.add('locBoxPubNotification')
	}
	// clear inner HTML
	senderWho.innerHTML = ''
	latestMessage.innerHTML = ''

	//insert new data
	senderWho.innerText = data.sender + ';'
	latestMessage.innerText = data.message
	latestMessageTime.innerText = timeSince(data.createdAt)
}

export const applyMessageLeft = (data: any) => {
	const textMessages: any = document.getElementById('textMessages')

	const div = document.createElement('div')
	div.classList.add('text')
	div.classList.add('sender')

	const p = document.createElement('p')

	const span1 = document.createElement('span')
	span1.style.color = 'var(--primary)'
	span1.innerText = data.sender + '; '

	const span2 = document.createElement('span')
	span2.style.color = 'var(--secondaryThemeInverted)'
	span2.innerText = data.message

	//LIKE BUTTON
	const span3 = document.createElement('span')
	span3.classList.add('spanFlexLeft')
	const span4 = document.createElement('span')
	span4.classList.add('timeSpan')
	const span5 = document.createElement('span')
	span5.classList.add('timeSpan')
	span5.classList.add('likeSPan')
	span5.style.marginRight = '10px'

	// span3.append(span5) //not yet implemented the like button
	span3.append(span4)

	// span4.classList.add('timeSpanLeft')
	span4.innerText = timeSince(data.createdAt)

	p.appendChild(span1)
	p.appendChild(span2)
	p.appendChild(span3)
	div.appendChild(p)

	textMessages.appendChild(div)
}
