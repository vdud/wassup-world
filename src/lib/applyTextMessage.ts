import { timeSince } from './timeFormat'

export const applyMessage = (data: any) => {
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
	span3.classList.add('timeSpan')
	span3.classList.add('timeSpanLeft')
	span3.innerText = timeSince(data.createdAt)

	p.appendChild(span1)
	p.appendChild(span2)
	p.appendChild(span3)
	div.appendChild(p)

	textMessages.appendChild(div)
}
