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
		body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id, $userGroup_id: data.$userGroup_id }),
	})

	const response = await res.json()
	if (response.isLiked === true) {
		LIKE.innerText = "love'd"
		// 	const likes = data.likes + 1
	} else if (response.isLiked === false) {
		LIKE.innerText = 'love'
		// 	const likes = data.likes - 1
		// 	LIKE_NO.innerText = likesabove10k(likes).toString()
	}
	LIKE_NO.innerText = likesabove10k(response.likes).toString()
	if (!res.ok) {
		alert(response.message)
	}
}

export const likesabove10k = (likes: any) => {
	if (likes > 1000000) {
		const afterLikes = likes / 1000000
		return `${afterLikes.toFixed(2)}mil`
	} else if (likes > 10000 && likes < 1000000) {
		const afterLikes = likes / 1000
		return `${afterLikes.toFixed(1)}k`
	} else if (likes < 10000) {
		return likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
}

export const incrementLikes = async (data: any) => {
	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
	if (!LIKE_NO) {
		return
	}

	const likes = data.likes
	if (likes === null) {
		LIKE_NO.innerText = '0'
	} else {
		LIKE_NO.innerText = likesabove10k(likes)
	}
}
