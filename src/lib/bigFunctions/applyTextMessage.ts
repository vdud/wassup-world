import { likeThatMsg, likesabove10k } from './likeThatMsg'
import { timeSince } from './timeFormat'
import { togglePublic } from './toggleNavLocs'

export const applyMessage = (data: any, isYoMe: boolean) => {
	const textMessages: any = document.getElementById('textMessages')

	const div = document.createElement('div')
	div.classList.add('text')
	div.classList.add(isYoMe ? 'yoMe' : 'sender')

	const p = document.createElement('p')

	//sender span
	const span1 = document.createElement('span')
	span1.style.color = isYoMe ? 'var(--secondary)' : 'var(--primary)'
	span1.innerText = data.sender + '; '

	//message span
	const span2 = document.createElement('span')
	span2.style.color = 'var(--tertiaryThemeInverted)'
	span2.innerText = data.message

	//third span //data span
	const span3 = document.createElement('span')
	span3.classList.add(isYoMe ? 'spanFlexRight' : 'spanFlexLeft')

	//time span
	const timeSpan = document.createElement('span')
	timeSpan.classList.add('timeSpan')
	timeSpan.classList.add('flexTime')
	timeSpan.innerText = timeSince(data.createdAt)
	timeSpan.style.margin = '0 10px'
	timeSpan.classList.add('timeSpanLeft')

	//like span
	const likeNumberButton = document.createElement('button')
	likeNumberButton.classList.add('timeSpan')
	likeNumberButton.classList.add('likeSPan')

	//like number span
	const span5 = document.createElement('span')
	span5.classList.add('optDark')
	span5.id = `LIKE_NO?${data.messageId}`
	span5.innerText = '0'

	// hearts icon //fa-hearts
	const i1 = document.createElement('i')
	i1.classList.add('fa-solid')
	i1.classList.add('fa-heart')
	i1.classList.add('optDark')
	i1.style.margin = '3px'

	//like button append
	likeNumberButton.append(span5)
	likeNumberButton.append(i1)

	//love button
	const loveButton = document.createElement('button')
	const span6 = document.createElement('span')
	span6.id = `LIKE?${data.messageId}`
	span6.classList.add('timeSpan')
	span6.classList.add('LikeSpan')
	span6.innerText = 'love'
	span6.classList.add('loved')
	loveButton.append(span6)

	loveButton.onclick = () => {
		likeThatMsg({ _id: data.messageId, $userName_id: data.$userName_id, likes: 0, $userGroup_id: data.$userGroup_id })
	}

	//Got to reply button
	const goToReplyButton = document.createElement('button')
	goToReplyButton.classList.add('timeSpan')
	goToReplyButton.classList.add('LikeSpan')
	goToReplyButton.onclick = () => {
		window.location.pathname = '/Messages/' + data.messageId
	}
	const totalRepliespText = document.createElement('p')
	totalRepliespText.classList.add('totalRepliespText')
	const span4 = document.createElement('span')
	span4.innerText = 'REPLY'
	span4.style.fontFamily = 'UBold'
	span4.style.marginRight = '5px'
	const span7 = document.createElement('span')
	const i2 = document.createElement('i')
	i2.classList.add('fa')
	i2.classList.add('fa-square-up-right')
	span7.append(i2)
	totalRepliespText.append(span4)
	totalRepliespText.append(span7)
	goToReplyButton.append(totalRepliespText)

	//total replies span
	const buttonTotalReplies = document.createElement('button')
	buttonTotalReplies.classList.add('timeSpan')
	const totalRepliespText2 = document.createElement('p')
	totalRepliespText2.classList.add('totalRepliespText')
	const span8 = document.createElement('span')
	span8.innerText = `${likesabove10k(0)} replies`
	totalRepliespText2.append(span8)
	buttonTotalReplies.append(totalRepliespText2)

	//append to spans3
	timeSpan.style.margin = '0 10px'
	if (isYoMe) {
		span3.append(goToReplyButton)
		span3.append(likeNumberButton)
		span3.append(buttonTotalReplies)
		span3.append(timeSpan)
		span3.append(loveButton)

		buttonTotalReplies.style.marginLeft = '10px'
		likeNumberButton.style.marginLeft = '10px'
	} else if (!isYoMe) {
		span3.append(loveButton)
		span3.append(timeSpan)
		span3.append(buttonTotalReplies)
		span3.append(likeNumberButton)
		span3.append(goToReplyButton)

		buttonTotalReplies.style.marginRight = '10px'
		likeNumberButton.style.marginRight = '10px'
	}

	p.appendChild(span1)
	p.appendChild(span2)
	p.appendChild(span3)
	div.appendChild(p)

	textMessages.appendChild(div)
}

//NAV-BAR Messages
export const applyNavDataMessage = (data: any) => {
	const groupLocBox = document.getElementById(`locBox?${data.groupId}`)
	const senderWho = document.getElementById(`SENDER?${data.groupId}`)
	const latestMessage = document.getElementById(`LM?${data.groupId}`)
	const latestMessageTime = document.getElementById(`LMT?${data.groupId}`)
	const gName = document.getElementById(`gName?${data.groupId}`)

	if (!senderWho || !latestMessage || !latestMessageTime || !groupLocBox || !gName) {
		return
	}
	groupLocBox.style.order = '-1'

	if (data.nature === 'HASHTAGS') {
		groupLocBox.classList.add('locBoxHashNotification')
		senderWho.style.color = 'var(--primary)'
		gName.style.color = 'var(--primary)'
		latestMessageTime.style.color = 'var(--primary)'
	} else if (data.nature === 'LOCATIONS') {
		groupLocBox.classList.add('locBoxLocationNotification')
		senderWho.style.color = 'var(--secOptDark)'
		gName.style.color = 'var(--secOptDark)'
		latestMessageTime.style.color = 'var(--secOptDark)'
	} else if (data.nature === 'PUBLIC') {
		groupLocBox.classList.add('locBoxPubNotification')
		senderWho.style.color = 'var(--secondary)'
		gName.style.color = 'var(--secondary)'
		latestMessageTime.style.color = 'var(--secondary)'
	}
	// clear inner HTML
	senderWho.innerHTML = ''
	latestMessage.innerHTML = ''

	//insert new data
	senderWho.innerText = data.sender + ';'
	latestMessage.innerText = data.message
	latestMessageTime.innerText = timeSince(data.createdAt)
}

// apply new message to the PUB chat //NAV-BAR
export const applyNewMessage = (data: any) => {
	const PUB = document.getElementById('PUB')

	if (PUB) {
		const contactButton = document.getElementById(`locBox?${data.groupId}`)

		if (contactButton) {
			applyNavDataMessage(data)
		} else {
			const noMoreBox = document.getElementById('noMoreBox')
			const noMoreText = document.getElementById('noMoreText')
			if (noMoreBox && noMoreText) {
				noMoreBox.style.display = 'none'
				noMoreText.style.display = 'none'
			}

			const button = document.createElement('button')
			button.style.order = '-1'

			button.classList.add('locBox')
			button.classList.add('locBoxPubNotification')
			button.id = `locBox?${data.groupId}`

			button.onclick = () => {
				togglePublic(data.groupName)
			}

			const div1 = document.createElement('div')
			div1.classList.add('locBoxItems')
			div1.classList.add('item1')
			div1.style.paddingTop = '5px'
			div1.style.marginBottom = '-5px'

			const p1 = document.createElement('p')
			p1.classList.add('textLoc')
			p1.classList.add('text2')
			p1.style.color = 'var(--secondary)'
			p1.id = `gName?${data.groupId}`
			p1.innerText = data.groupName.toUpperCase()

			const div2 = document.createElement('div')
			div2.classList.add('locBoxItems')
			div2.classList.add('item2')

			const p2 = document.createElement('p')
			p2.classList.add('textLoc')
			p2.classList.add('text1')
			p2.style.fontSize = 'var(--fontSize)'
			// p2.id = `LM?${data.groupId}`
			// p2.innerHTML = `<span id="SENDER?${data.groupId}" class="latestMessageSender">${data.sender};</span><span id="LM?${data.groupId}" class="latestMessage">${data.message}</span>`
			const span1 = document.createElement('span')
			span1.id = `SENDER?${data.groupId}`
			span1.classList.add('latestMessageSender')
			span1.style.color = 'var(--secondary)'
			span1.innerText = data.sender + ';'

			const span2 = document.createElement('span')
			span2.id = `LM?${data.groupId}`
			span2.classList.add('latestMessage')
			span2.innerText = data.message

			p2.appendChild(span1)
			p2.appendChild(span2)
			// p2.innerText = data.message

			const div3 = document.createElement('div')
			div3.classList.add('locBoxItems')
			div3.classList.add('item3')

			const p3 = document.createElement('p')
			p3.classList.add('textLoc')
			p3.classList.add('text3')

			const span = document.createElement('span')
			span.id = `LMT?${data.groupId}`
			span.innerText = timeSince(data.createdAt)
			span.style.color = 'var(--secondary)'

			p3.appendChild(span)

			div1.appendChild(p1)
			div2.appendChild(p2)
			div3.appendChild(p3)

			button.appendChild(div1)
			button.appendChild(div2)
			button.appendChild(div3)

			PUB.appendChild(button)
		}
	}
}
