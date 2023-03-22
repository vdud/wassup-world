export const likesabove10k = (likes: any) => {
	if (likes > 100000 && likes < 1000000) {
		const afterLikes = likes / 1000
		return `${afterLikes.toFixed(2)}k`
	} else if (likes > 1000000) {
		const afterLikes = likes / 1000000
		return `${afterLikes.toFixed(2)}mil`
	} else {
		return likes
	}
}
