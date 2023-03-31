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
							allUsers: {
								_id: 1,
								name: 1,
								lastLoggedIn: 1,
							},
						},
					},
				])
				.sort({ lastLoggedIn: -1 })
				.toArray();

			const returnRepliesData = await massagesCreate
				.find({ replyTo: new ObjectId(messageId) })
				.sort({ likes: -1 })
				.limit(100)
				.toArray();

			if (returnRepliesData) {
				return {
					status: 200,
					body: {
						message: JSON.stringify(findMessage),
						replyData: JSON.stringify(returnRepliesData),
						allUsers: JSON.stringify(groupUsers[0].allUsers),
					},
				};
			}
		} else {
			return;
		}
	}
}) satisfies PageServerLoad;
