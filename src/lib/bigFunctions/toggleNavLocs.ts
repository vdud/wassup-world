import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';

export const toggleLoc = (groupName: any, _id: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'LOCATION' }));
};
export const toggleHashtag = (groupName: any, _id: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'HASHTAG' }));
};
export const togglePublic = (groupName: any, _id: any) => {
	localStorage.setItem('nature', JSON.stringify({ $nature: 'PUBLIC' }));
};
