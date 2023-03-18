// $like the post

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { groups, mainUser } from '$db/collections'
import { ObjectId } from 'mongodb'

export const POST = (async ({ request }) => {
	const { loc, $userName_id } = await request.json()

	return json({ success: false, isLiked: 'oops' })
}) satisfies RequestHandler
