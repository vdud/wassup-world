export const likeThatMsg = async (_id: any, $userName_id: any) => {
	const LIKE = document.getElementById(`LIKE?${_id}`)
	const LIKE_NO = document.getElementById(`LIKE_NO?${_id}`)
	if (!LIKE || !LIKE_NO) {
		return
	}

	const res = await fetch('/api/likeMessage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ $userName_id, messageId: _id }),
	})

	const response = await res.json()
	// console.log(response)
	if (response.isLiked === true) {
		LIKE.innerText = 'liked'

		const likes = parseInt(LIKE_NO.innerText) + 1
		LIKE_NO.innerText = likes.toString()
	} else if (response.isLiked === false) {
		LIKE.innerText = 'like'

		const likes = parseInt(LIKE_NO.innerText) - 1
		LIKE_NO.innerText = likes.toString()
	}
	if (!res.ok) {
		alert(response.message)
	}
}
