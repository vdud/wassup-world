import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { mainUser, groups, massagesCreate } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const { user, HASHID } = params;
	const latestMessages: any = [];

	if (user) {
		const findUser = await mainUser.findOne({ _id: new ObjectId(user) });
		if (findUser) {
			const findGroup = await groups.findOne({ _id: new ObjectId(HASHID) });
			if (findGroup) {
				const findUserLink = await mainUser.findOne({ _id: findUser._id, allGroups: { $in: [findGroup._id] } });

				if (!findUserLink) {
					await mainUser.updateOne({ _id: findUser._id }, { $addToSet: { allGroups: findGroup._id } });
				}

				if (findGroup) {
					const returnMsgData = await massagesCreate
						.aggregate([
							{ $match: { group_id: findGroup._id, isReply: false } },
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
							{ $match: { group_id: findGroup._id, isReply: false } },
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
						.sort({ likes: -1 })
						.limit(10)
						.match({ likes: { $gt: 19 } })
						.toArray();

					//sort by last logged In
					const groupUsers = await groups
						.aggregate([
							{ $match: { _id: findGroup._id } },
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
						groupId: JSON.stringify(findGroup._id),
						body: {
							allUsers: JSON.stringify(groupUsers[0].allUsers),
							messages: JSON.stringify(returnMsgData),
							topLikes: JSON.stringify(topLikes),
							groupName: findGroup.name,
							createdAt: findGroup.createdAt,
							nature: findGroup.nature,
						},
					};
				}
			}
		}
	} else {
		const findGroup = await groups.findOne({ name: HASHID, nature: 'HASHTAGS' });

		if (findGroup) {
			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findGroup._id, isReply: false } },
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
					{ $match: { group_id: findGroup._id, isReply: false } },
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
				.match({ likes: { $gt: 19 } })
				.sort({ likes: -1 })
				.limit(10)
				.toArray();

			const groupUsers = await groups
				.aggregate([
					{ $match: { _id: findGroup._id } },
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
				groupId: JSON.stringify(findGroup._id),
				body: {
					allUsers: JSON.stringify(groupUsers[0].allUsers),
					messages: JSON.stringify(returnMsgData),
					topLikes: JSON.stringify(topLikes),
					groupName: findGroup.name,
					createdAt: findGroup.createdAt,
					nature: findGroup.nature,
				},
			};
		}
		const findGroupbyId = await groups.findOne({ _id: new ObjectId(HASHID) });
		if (findGroupbyId) {
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
				.match({ likes: { $gt: 19 } })
				.sort({ likes: -1 })
				.limit(10)
				.toArray();

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
				])
				.sort({ lastLoggedIn: 1 })
				.toArray();

			return {
				status: 200,
				groupId: JSON.stringify(findGroupbyId._id),
				body: {
					messages: JSON.stringify(returnMsgData),
					topLikes: JSON.stringify(topLikes),
					groupName: findGroupbyId.name,
					createdAt: findGroupbyId.createdAt,
					nature: findGroupbyId.nature,
				},
			};
		}
	}
}) as PageServerLoad;
