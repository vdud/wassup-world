import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { mainUser, groups, massagesCreate } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const { user, messageId } = params;
	if (messageId) {
		const findMessage = await massagesCreate.findOne({ _id: new ObjectId(messageId) });

		if (findMessage) {
			const groupUsers = await groups
				.aggregate([
					{ $match: { _id: findMessage.group_id } },
					{
						$lookup: {
							from: 'user',
							localField: 'allUsers',
							foreignField: '_id',
							as: 'allUsers',
						},
					},
					{
						$project: {
							_id: 1,
							nature: 1,
							allUsers: {
								_id: 1,
								name: 1,
								lastLoggedIn: 1,
							},
						},
					},
					{
						$unwind: '$allUsers',
					},
					{
						$sort: {
							'allUsers.lastLoggedIn': -1,
						},
					},
					{
						$group: {
							_id: '$_id',
							groupNature: {
								$first: '$nature',
							},
							allUsers: {
								$push: '$allUsers',
							},
						},
					},
				])
				.toArray();

			const returnRepliesData = await massagesCreate
				.find({ replyTo: new ObjectId(messageId) })
				.sort({ likes: -1 })
				.limit(100)
				.toArray();

			if (returnRepliesData) {
				return {
					status: 200,
					groupId: JSON.stringify(findMessage.group_id),
					body: {
						message: JSON.stringify(findMessage),
						replyData: JSON.stringify(returnRepliesData),
						allUsers: JSON.stringify(groupUsers[0].allUsers),
						groupNature: JSON.stringify(groupUsers[0].groupNature),
						nature: JSON.stringify(findMessage.nature),
					},
				};
			}
		} else {
			return;
		}
	}
}) satisfies PageServerLoad;
