export const likeThatMsg = async (data: any) => {
	const LIKE = document.getElementById(`LIKE?${data._id}`)
	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)

	const res = await fetch('/api/likeMessage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id, $userGroup_id: data.$userGroup_id }),
	})

	const response = await res.json()
	if (response.isLiked === true) {
		if (LIKE) {
			LIKE.innerText = "love'd"
		}
	} else if (response.isLiked === false) {
		if (LIKE) {
			LIKE.innerText = 'love'
		}
	}
	if (LIKE_NO) {
		LIKE_NO.innerText = likesabove10k(response.likes).toString()
	}
	const TOPLIKE = document.getElementById(`TopLike?${data._id}`)
	const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)

	if (response.isLiked === true) {
		if (TOPLIKE) {
			TOPLIKE.innerText = "love'd"
		}
	} else if (response.isLiked === false) {
		if (TOPLIKE) {
			TOPLIKE.innerText = 'love'
		}
	}
	if (TOPLIKE_NO) {
		TOPLIKE_NO.innerText = likesabove10k(response.likes).toString()
	}

	if (!res.ok) {
		alert(response.message)
	}
}

// export const likeTopMessage = async (data: any) => {
// 	const TOPLIKE = document.getElementById(`TopLike?${data._id}`)
// 	const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)
// 	if (TOPLIKE && TOPLIKE_NO) {
// 		const res = await fetch('/api/likeMessage', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ username_id: data.$userName_id, messageId: data._id, $userGroup_id: data.$userGroup_id }),
// 		})

// 		const response = await res.json()
// 		if (response.isLiked === true) {
// 			TOPLIKE.innerText = "love'd"
// 		} else if (response.isLiked === false) {
// 			TOPLIKE.innerText = 'love'
// 		}
// 		TOPLIKE_NO.innerText = likesabove10k(response.likes).toString()
// 		if (!res.ok) {
// 			alert(response.message)
// 		}
// 	} else if (!TOPLIKE || !TOPLIKE_NO) {
// 		return
// 	}
// }

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
	//put in await function
	const likes = data.likes
	// console.log('data', data)

	const awaitTOPLIKENO = () => {
		const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)
		// console.log('TOPLIKE_NO', TOPLIKE_NO)
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
		// console.log('LIKE_NO', LIKE_NO)
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

// export const incrementTopLikes = async (data: any) => {
// 	const TOPLIKE_NO = document.getElementById(`TopLike_No?${data._id}`)
// 	if (!TOPLIKE_NO) {
// 		return
// 	}
// 	const likes = data.likes
// 	if (likes === null) {
// 		TOPLIKE_NO.innerText = '0'
// 	} else {
// 		TOPLIKE_NO.innerText = likesabove10k(likes)
// 	}

// 	const LIKE_NO = document.getElementById(`LIKE_NO?${data._id}`)
// 	if (!LIKE_NO) {
// 		return
// 	}
// 	if (likes === null) {
// 		LIKE_NO.innerText = '0'
// 	} else {
// 		LIKE_NO.innerText = likesabove10k(likes)
// 	}
// }
