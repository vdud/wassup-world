import { timeSince } from './timeFormat'
import { togglePublic } from './toggleNavLocs'

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

// 	<button on:click={toggleLoc.bind(globalThis, name)} id="locBox?{_id}" class="locBox {i === 0 ? 'locBoxLocationNotification' : ''}">
// 	<!-- SENDER -->
// 	<div class="locBoxItems item1" style="padding-top:5px;margin-bottom:-5px;">
// 		<p class="textLoc text2" style={i === 0 ? 'color: var(--secOptDark)' : ''} id="gName?{_id}">{name.toUpperCase()}</p>
// 	</div>

// 	<!-- LATEST MESSAGE -->
// 	<div class="locBoxItems item2">
// 		<p class="textLoc text1" style="font-size:var(--fontSize)">
// 			{#if lastMessage === undefined}
// 				<span id="SENDER?{_id}" style={i === 0 ? 'color: var(--secOptDark)' : ''} class="latestMessageSender"><span class="sendBox" style={$nature === 'LOCATION' ? 'background-color:var(--secOptDark)' : 'background-color:var(--tertiaryThemeInverted )'}> SEND MESSAGE </span></span>
// 				<span id="LM?{_id}" class="latestMessage"><span style={$nature === 'LOCATION' ? 'background-color:var(--secOptDark)' : 'background-color:var(--tertiaryThemeInverted )'} class="fa fa-arrow-right sendArrow" /></span>
// 			{:else}
// 				<span id="SENDER?{_id}" style={i === 0 ? 'color: var(--secOptDark)' : ''} class="latestMessageSender">
// 					{latestMessageSender};
// 				</span>
// 				<span id="LM?{_id}" class="latestMessage">
// 					{lastMessage}
// 				</span>
// 			{/if}
// 		</p>
// 	</div>

// 	<!-- TIME -->
// 	<div class="locBoxItems item3">
// 		<p id="LMT?{_id}" class="textLoc text3">{timeSince(updatedAt)}</p>
// 	</div>
// </button>

// apply new message to the chat
export const applyNewMessage = (data: any) => {
	const PUB = document.getElementById('PUB')

	if (PUB) {
		const contactButton = document.getElementById(`locBox?${data.groupId}`)

		if (contactButton) {
			// applyNavDataMessage(data)
			return
		} else {
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
