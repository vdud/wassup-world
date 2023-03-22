import { likesabove10k } from './likesabove10k'

export const likeThatMsg = async (data: any) => {
	const LIKE = document.getElementById(`LIKE?${data._id}`)
	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
	if (!LIKE || !LIKE_NO) {
		return
	}
	const res = await fetch('/api/likeMessage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id }),
	})

	const response = await res.json()
	if (response.isLiked === true) {
		LIKE.innerText = "love'd"

		const likes = data.likes + 1
		LIKE_NO.innerText = likesabove10k(likes.toString())
	} else if (response.isLiked === false) {
		LIKE.innerText = 'love'

		const likes = data.likes - 1
		LIKE_NO.innerText = likesabove10k(likes.toString())
	}
	if (!res.ok) {
		alert(response.message)
	}
}
