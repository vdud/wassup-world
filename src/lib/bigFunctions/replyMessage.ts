import { likeThatMsg, likesabove10k } from './likeThatMsg'
import { timeSince } from './timeFormat'

export const replyMessage = async (data: any) => {
	const replies = document.getElementById('replies')
	const removeBeforeSending = document.getElementById('removeBeforeSending')

	if (removeBeforeSending) {
		removeBeforeSending.remove()
	}
	if (replies) {
		const div = document.createElement('div')
		div.classList.add('flexBod', 'flexReplyBod', 'paddingBottom')

		const p = document.createElement('p')
		p.classList.add('mainMessage')
		const span = document.createElement('span')
		span.classList.add('sender')
		span.style.color = 'var(--primary)'
		span.innerText = data.data.sender + '; '
		const span2 = document.createElement('span')
		span2.style.color = 'var(--primaryThemeInverted)'
		span2.innerText = data.data.message

		p.appendChild(span)
		p.appendChild(span2)

		const bottomButtons = document.createElement('span')
		bottomButtons.classList.add('bottomButtons')

		const timeSpan = document.createElement('span')
		timeSpan.classList.add('timeSpan', 'flexTime')
		timeSpan.innerText = timeSince(data.data.createdAt)

		const totalRepliesButton = document.createElement('button')
		totalRepliesButton.classList.add('timeSpan')
		totalRepliesButton.style.marginLeft = '10px'
		const totalRepliespText = document.createElement('p')
		totalRepliespText.classList.add('totalRepliespText')
		const totalRepliesSpan = document.createElement('span')
		totalRepliesSpan.id = 'Replies_No?' + data.data._id
		totalRepliesSpan.innerText = likesabove10k(data.data.totalReplies) + ' replies'

		totalRepliespText.appendChild(totalRepliesSpan)
		totalRepliesButton.appendChild(totalRepliespText)

		const likeButton = document.createElement('button')
		likeButton.classList.add('timeSpan', 'replyLikeButton')
		likeButton.style.marginLeft = '10px'
		likeButton.onclick = () => {
			likeThatMsg({ _id: data.data._id, likes: 0, $userName_id: data.$userName_id, $userGroup_id: data.$userGroup_id })
		}
		const optDark = document.createElement('span')
		optDark.classList.add('optDark')
		optDark.id = 'LIKE_NO?' + data.data._id
		optDark.innerText = '0'
		const FA_SOLIDi = document.createElement('i')
		FA_SOLIDi.classList.add('fa-regular', 'fa-heart', 'optDark')
		FA_SOLIDi.style.margin = '3px'
		FA_SOLIDi.id = 'FA_SOLID?' + data.data._id

		likeButton.appendChild(optDark)
		likeButton.appendChild(FA_SOLIDi)

		const goToButton = document.createElement('button')
		goToButton.classList.add('timeSpan', 'LikeSpan')
		goToButton.style.marginLeft = '10px'
		goToButton.onclick = () => {
			window.location.pathname = '/Messages/' + data.data._id
		}
		const goToText = document.createElement('p')
		goToText.classList.add('totalRepliespText', 'REPLY_TEXT')
		const REPLYSPAN = document.createElement('span')
		REPLYSPAN.innerText = 'REPLY'
		REPLYSPAN.style.marginRight = '5px'
		const FA_SQ_U_R = document.createElement('i')
		FA_SQ_U_R.classList.add('fa', 'fa-square-up-right')

		goToText.appendChild(REPLYSPAN)
		goToText.appendChild(FA_SQ_U_R)

		goToButton.appendChild(goToText)

		bottomButtons.appendChild(timeSpan)
		bottomButtons.appendChild(totalRepliesButton)
		bottomButtons.appendChild(likeButton)
		bottomButtons.appendChild(goToButton)

		//append all

		div.appendChild(p)
		div.appendChild(bottomButtons)
		replies.appendChild(div)
	}
}
