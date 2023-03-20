export const toggleLoc = (groupName: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'LOCATION' }))
	window.location.pathname = '/LOC/' + groupName
}
export const toggleHashtag = (groupName: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'HASHTAG' }))
	window.location.pathname = '/HASH/' + groupName
}
export const togglePublic = (groupName: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'PUBLIC' }))
	window.location.pathname = '/PUB/' + groupName
}
