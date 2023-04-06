import type { PageServerLoad } from './$types';

import { mainUser, groups, massagesCreate } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const { user, PUB } = params;

	if (user) {
		const userSender = await mainUser.findOne({ _id: new ObjectId(user) });
		const userReciever = await mainUser.findOne({ _id: new ObjectId(PUB) });

		if (!userSender || !userReciever) {
			return;
		}

		const findFirstGroup = await groups.findOne({ name: `${userSender.name};${userReciever.name}`, nature: 'PUBLIC' });
		const findSecondGroup = await groups.findOne({ name: `${userReciever.name};${userSender.name}`, nature: 'PUBLIC' });

		if (!findFirstGroup && !findSecondGroup) {
			const newGroup = await groups.insertOne({
				name: `${userSender.name};${userReciever.name}`,
				allUsers: [userSender._id, userReciever._id],
				nature: 'PUBLIC',
				createdAt: new Date(),
				updatedAt: new Date(),
				messages: [],
			});

			await mainUser.updateOne({ _id: userSender._id }, { $push: { allGroups: newGroup.insertedId } });
			await mainUser.updateOne({ _id: userReciever._id }, { $push: { allGroups: newGroup.insertedId } });

			const allUsers = await groups
				.aggregate([
					{ $match: { _id: newGroup.insertedId } },
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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: newGroup.insertedId, isReply: false } },
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
					{ $match: { group_id: newGroup.insertedId, isReply: false } },
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

			return {
				status: 200,
				groupId: JSON.stringify(newGroup.insertedId),
				body: {
					allUsers: JSON.stringify(allUsers[0].allUsers),
					topLikes: JSON.stringify(topLikes),
					messages: JSON.stringify(returnMsgData),
					groupName: `${userSender.name};${userReciever.name}`,
					createdAt: new Date(),
					nature: 'PUBLIC',
					groupData: JSON.stringify(newGroup.ops[0]),
				},
			};
		} else if (findFirstGroup) {
			const returnData = await groups
				.aggregate([
					{ $match: { _id: findFirstGroup._id } },
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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findFirstGroup._id, isReply: false } },
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
					{ $match: { group_id: findFirstGroup._id, isReply: false } },

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

			return {
				status: 200,
				groupId: JSON.stringify(findFirstGroup._id),
				body: {
					allUsers: JSON.stringify(returnData[0].allUsers),
					topLikes: JSON.stringify(topLikes),
					messages: JSON.stringify(returnMsgData),
					groupName: findFirstGroup.name,
					createdAt: findFirstGroup.createdAt,
					nature: findFirstGroup.nature,
					groupData: JSON.stringify(findFirstGroup),
				},
			};
		} else if (findSecondGroup) {
			const returnData = await groups
				.aggregate([
					{ $match: { _id: findSecondGroup._id } },
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

			const returnMsgData = await massagesCreate
				.aggregate([
					{ $match: { group_id: findSecondGroup._id, isReply: false } },
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
					{ $match: { group_id: findSecondGroup._id, isReply: false } },
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
				.match({ likes: { $gt: 19 } })
				.limit(10)
				.toArray();

			return {
				status: 200,
				groupId: JSON.stringify(findSecondGroup._id),
				body: {
					allUsers: JSON.stringify(returnData[0].allUsers),
					topLikes: JSON.stringify(topLikes),
					messages: JSON.stringify(returnMsgData),
					groupName: findSecondGroup.name,
					createdAt: findSecondGroup.createdAt,
					nature: findSecondGroup.nature,
					groupData: JSON.stringify(findSecondGroup),
				},
			};
		}
	} else {
		// if (!user) {
		const findGroup = await groups.findOne({ name: PUB, nature: 'PUBLIC' });

		if (findGroup) {
			const returnData = await groups
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
				.match({ likes: { $gt: 19 } })
				.limit(10)
				.toArray();

			return {
				status: 200,
				groupId: JSON.stringify(findGroup._id),
				body: {
					allUsers: JSON.stringify(returnData[0].allUsers),
					topLikes: JSON.stringify(topLikes),
					messages: JSON.stringify(returnMsgData),
					groupName: findGroup.name,
					createdAt: findGroup.createdAt,
					nature: findGroup.nature,
					groupData: JSON.stringify(findGroup),
				},
			};
		}

		const findGroupbyId = await groups.findOne({ _id: new ObjectId(PUB) });

		if (findGroupbyId) {
			const returnData = await groups
				.aggregate([
					{ $match: { group_id: findGroupbyId._id } },
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
				.match({ likes: { $gt: 19 } })
				.limit(10)
				.toArray();

			return {
				status: 200,
				groupId: JSON.stringify(findGroupbyId._id),
				body: {
					allUsers: JSON.stringify(returnData[0].allUsers),
					topLikes: JSON.stringify(topLikes),
					messages: JSON.stringify(returnMsgData),
					groupName: findGroupbyId.name,
					createdAt: findGroupbyId.createdAt,
					nature: findGroupbyId.nature,
					groupData: JSON.stringify(findGroupbyId),
				},
			};
		}
	}
}) as PageServerLoad;
