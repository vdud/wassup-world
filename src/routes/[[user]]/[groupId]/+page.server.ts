import type { PageServerLoad } from './$types';
import { mainUser, groups, massagesCreate } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const { user, groupId } = params;
	if (!user) {
		const findGroupbyId = await groups.findOne({ _id: new ObjectId(groupId) });
		if (findGroupbyId) {
			const groupUsers = await groups
				.aggregate([
					{ $match: { _id: findGroupbyId._id } },
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
							allUsers: {
								$push: '$allUsers',
							},
						},
					},
				])
				.toArray();

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findGroupbyId._id, isReply: false } },
					{
						$project: {
							_id: 1,
							message: 1,
							createdAt: 1,
							sender: 1,
							likedPeople: 1,
							likes: 1,

							replies: 1,
							isReply: 1,
							totalReplies: 1,
						},
					},
				])
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray();

			const topLikes = await massagesCreate
				.aggregate([
					{ $match: { group_id: findGroupbyId._id, isReply: false } },
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
							allUsers: {
								$push: '$allUsers',
							},
						},
					},
				])
				.toArray();

			return {
				status: 200,
				groupId: JSON.stringify(findGroupbyId._id),
				body: {
					allUsers: JSON.stringify(groupUsers[0].allUsers),
					groupData: JSON.stringify(findGroupbyId),
					messages: JSON.stringify(returnMsgData),
					topLikes: JSON.stringify(topLikes),
					groupName: findGroupbyId.name,
					createdAt: findGroupbyId.createdAt,
					nature: findGroupbyId.nature,
				},
			};
		}
	}
	return {
		status: 404,
		groupId,
		body: {
			error: 'Not Found',
		},
	};
}) satisfies PageServerLoad;
