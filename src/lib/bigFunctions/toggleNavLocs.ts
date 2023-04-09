import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
import { nature } from '$lib/stores/nature';
import { isShowInfo } from '$lib/stores/isShowInfo';
import { isFlex } from '$lib/stores/isFlex';

const toggleMiddleNavRef = (groupName: any, _id: any, Nature: any) => {
	isFlex.set(false);
	localStorage.setItem('nature', JSON.stringify({ $nature: Nature }));
	// nature.set(Nature);
	currentPageHeaderData.set(groupName);
	isShowInfo.set(false);
};

export const toggleLoc = (groupName: any, _id: any) => {
	toggleMiddleNavRef(groupName, _id, 'LOCATION');
};
export const toggleHashtag = (groupName: any, _id: any) => {
	toggleMiddleNavRef(groupName, _id, 'HASHTAG');
};
export const togglePublic = (groupName: any, _id: any) => {
	toggleMiddleNavRef(groupName, _id, 'PUBLIC');
};
