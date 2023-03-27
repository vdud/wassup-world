export const likeThatMsg = async (data: any) => {
	const res = await fetch('/api/likeMessage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id, $userGroup_id: data.$userGroup_id }),
	})

	const response = await res.json()
	const LIKE = document.getElementById(`FA_SOLID?${data._id}`)
	if (LIKE) {
		LIKE.classList.remove('fa-solid')
		LIKE.classList.remove('fa-regular')

		if (response.isLiked === true) {
			LIKE.classList.add('fa-solid')
		} else if (response.isLiked === false) {
			LIKE.classList.add('fa-regular')
		}
	}

	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
	if (LIKE_NO) {
		LIKE_NO.innerHTML = likesabove10k(response.likes)
	}

	const FA_SOLID_TOP = document.getElementById(`FA_SOLID_TOP?${data._id}`)
	if (FA_SOLID_TOP) {
		FA_SOLID_TOP.classList.remove('fa-solid')
		FA_SOLID_TOP.classList.remove('fa-regular')

		if (response.isLiked === true) {
			FA_SOLID_TOP.classList.add('fa-solid')
		} else if (response.isLiked === false) {
			FA_SOLID_TOP.classList.add('fa-regular')
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

export const incrementReplies = (data: any) => {
	const NormalReply = document.getElementById('Replies_No?' + data._id)
	if (NormalReply) {
		NormalReply.innerHTML = likesabove10k(data.replies) + ' replies'
	}
	const topReply = document.getElementById('topReplies_No?' + data._id)
	if (topReply) {
		topReply.innerHTML = likesabove10k(data.replies) + ' replies'
	}
}
