import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
import { nature } from '$lib/stores/nature';
import { isShowInfo } from '$lib/stores/isShowInfo';

const toggleMiddleNavRef = (groupName: any, _id: any, Nature: any) => {
	// isShowInfo set to false
	localStorage.setItem('nature', JSON.stringify({ $nature: Nature }));
	nature.set(Nature);

	isShowInfo.set(false);
};

export const toggleLoc = (groupName: any, _id: any) => {
	// localStorage.setItem('nature', JSON.stringify({ $nature: 'LOCATION' }));
	toggleMiddleNavRef(groupName, _id, 'LOCATION');
};
export const toggleHashtag = (groupName: any, _id: any) => {
	// localStorage.setItem('nature', JSON.stringify({ $nature: 'HASHTAG' }));
	toggleMiddleNavRef(groupName, _id, 'HASHTAG');
};
export const togglePublic = (groupName: any, _id: any) => {
	// localStorage.setItem('nature', JSON.stringify({ $nature: 'PUBLIC' }));
	toggleMiddleNavRef(groupName, _id, 'PUBLIC');
};
