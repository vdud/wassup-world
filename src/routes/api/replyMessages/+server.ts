import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

import { mainUser, massagesCreate, groups } from '$db/collections';
import { ObjectId } from 'mongodb';

import Pusher from 'pusher';
const pusher = new Pusher({
	appId: import.meta.env.VITE_APP_ID,
	key: import.meta.env.VITE_APP_KEY,
	secret: import.meta.env.VITE_APP_SECRET,
	cluster: import.meta.env.VITE_APP_CLUSTER,
	// useTLS: true,
});

export const POST = (async ({ request }) => {
	const { message, $userGroup_id, $userName, $userName_id, $messageId } = await request.json();

	const findGroup = await groups.findOne({ _id: new ObjectId($userGroup_id) });
	const findUser = await mainUser.findOne({ _id: new ObjectId($userName_id) });
	const findMessage = await massagesCreate.findOne({ _id: new ObjectId($messageId) });

	if (!findUser || !findGroup || !findMessage) {
		return json({ success: false });
	}

	const newMessage = await massagesCreate.insertOne({
		sender: $userName,
		message: message,
		group_id: findGroup._id,
		createdAt: new Date(),
		likedPeople: [],
		likes: 0,

		isReply: true,
		replies: [],
		totalReplies: 0,
		replyTo: findMessage._id,
	});

	pusher.trigger($messageId, 'ReplyMessage', {
		_id: newMessage.insertedId,
		message: message,
		sender: $userName,
		createdAt: new Date(),
		totalReplies: 0,
	});

	await massagesCreate.updateOne({ _id: findMessage._id }, { $addToSet: { replies: newMessage.insertedId }, $inc: { totalReplies: 1 } });

	pusher.trigger($userGroup_id, 'incrementReplies', {
		messageId: $messageId,
		totalReplies: findMessage.totalReplies + 1,
	});

	return json({ success: true, messageId: newMessage.insertedId });
}) satisfies RequestHandler;
