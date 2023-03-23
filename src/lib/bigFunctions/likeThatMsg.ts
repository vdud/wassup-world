export const likeThatMsg = async (data: any) => {
	const res = await fetch('/api/likeMessage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id, $userGroup_id: data.$userGroup_id }),
	})

	const response = await res.json()
	const LIKE = document.getElementById(`LIKE?${data._id}`)
	if (LIKE) {
		if (response.isLiked === true) {
			LIKE.innerText = "love'd"
		} else if (response.isLiked === false) {
			LIKE.innerText = 'love'
		}
	}

	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
	if (LIKE_NO) {
		LIKE_NO.innerHTML = likesabove10k(response.likes).toString()
	}

	const TOPLIKE = document.getElementById(`TopLike?${data._id}`)
	if (TOPLIKE) {
		if (response.isLiked === true) {
			TOPLIKE.innerText = "love'd"
		} else if (response.isLiked === false) {
			TOPLIKE.innerText = 'love'
		}
	}
	const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)
	if (TOPLIKE_NO) {
		TOPLIKE_NO.innerText = likesabove10k(response.likes).toString()
	}

	if (!res.ok) {
		alert(response.message)
	}
}

export const likesabove10k = (likes: any) => {
	if (likes > 1000000) {
		const afterLikes = likes / 1000000
		return `${afterLikes.toFixed(2)}m`
	} else if (likes >= 10000 && likes < 1000000) {
		const afterLikes = likes / 1000
		return `${afterLikes.toFixed(1)}k`
	} else if (likes < 10000) {
		return likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
}

export const incrementLikes = (data: any) => {
	const likes = data.likes
	const awaitTOPLIKENO = () => {
		const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)
		if (!TOPLIKE_NO) {
			return
		} else {
			if (likes === null) {
				return (TOPLIKE_NO.innerText = '0')
			} else {
				return (TOPLIKE_NO.innerText = likesabove10k(likes))
			}
		}
	}

	const awaitLIKENO = () => {
		const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
		if (!LIKE_NO) {
			return
		} else {
			if (likes === null) {
				return (LIKE_NO.innerText = '0')
			} else {
				return (LIKE_NO.innerText = likesabove10k(likes))
			}
		}
	}

	return awaitTOPLIKENO(), awaitLIKENO()
}
