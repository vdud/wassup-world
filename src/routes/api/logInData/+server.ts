import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { mainUser } from '$db/collections';

// import PusherPushNotifications from '@pusher/push-notifications-web'
// const beamsClient = new PusherPushNotifications.Client({
// 	instanceId: 'c9d50f68-33d2-4426-8a8d-2e82f0b778e7',
// })

// beamsClient
// 	.start()
// 	.then(() => beamsClient.addDeviceInterest('hello'))
// const beamsClient = new PusherPushNotifications.Client({
// 	instanceId: 'c9d50f68-33d2-4426-8a8d-2e82f0b778e7',
// })

// beamsClient
// 	.start()
// 	.then(() => beamsClient.addDeviceInterest('hello'))

export const POST = (async ({ request }) => {
	const { data } = await request.json();
	const userName = data;

	const findUser = await mainUser.findOne({ name: userName });
	if (!findUser) {
		const newUser = await mainUser.insertOne({ name: userName, allGroups: [], lastLoggedIn: new Date() });
		return json({ success: true, userName_id: newUser.insertedId, data: { formatedPUBLICdata: [], formatedHASHTAGSdata: [], formatedLOCdata: [] } });
	} else {
		mainUser.updateOne({ _id: findUser._id }, { $set: { lastLoggedIn: new Date() } });
		const formattedUserData = await mainUser
			.aggregate([
				{ $match: { _id: findUser._id } },
				{
					$lookup: {
						from: 'groups',
						localField: 'allGroups',
						foreignField: '_id',
						as: 'allGroups',
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						allGroups: {
							_id: 1,
							name: 1,
							nature: 1,
							lastMessage: 1,
							updatedAt: 1,
							latestMessageSender: 1,
							Theme: 1,
						},
					},
				},
				{
					$unwind: '$allGroups',
				},
				{
					$sort: {
						'allGroups.updatedAt': 1,
					},
				},
				{
					$group: {
						_id: '$_id',
						name: { $first: '$name' },
						allGroups: { $push: '$allGroups' },
					},
				},
			])
			.toArray();
		const formattedUserData_Group_ids = () => {
			if (formattedUserData.length === 0) {
				return [];
			}
			formattedUserData[0].allGroups = formattedUserData[0].allGroups.map((group: any) => group._id);
			return formattedUserData[0].allGroups;
		};

		const formatedPUBLICdata = () => {
			if (formattedUserData.length === 0) {
				return [];
			}
			const publicData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'PUBLIC').sort((a: any, b: any) => b.updatedAt - a.updatedAt);
			return publicData;
		};

		const formatedHASHTAGSdata = () => {
			if (formattedUserData.length === 0) {
				return [];
			}
			const hashtagsData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'HASHTAGS').sort((a: any, b: any) => b.updatedAt - a.updatedAt);
			return hashtagsData;
		};

		const formatedLOCdata = () => {
			if (formattedUserData.length === 0) {
				return [];
			}
			const locData = formattedUserData[0].allGroups.filter((formatGroup: any) => formatGroup.nature === 'LOCATIONS').sort((a: any, b: any) => b.updatedAt - a.updatedAt);
			return locData;
		};

		return json({ success: true, userName_id: findUser._id, data: { formatedPUBLICdata: formatedPUBLICdata(), formatedHASHTAGSdata: formatedHASHTAGSdata(), formatedLOCdata: formatedLOCdata(), formattedUserData_Group_ids: formattedUserData_Group_ids() } });
	}
}) satisfies RequestHandler;
