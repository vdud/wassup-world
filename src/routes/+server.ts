// import { PrismaClient } from '@prisma/client'
// import { json } from '@sveltejs/kit'
// const prisma = new PrismaClient()

// // async function create() {
// // 	await prisma.user.create({
// // 		data: {
// // 			name: 'Alice',
// // 			Groups: {
// // 				create: {
// // 					groupName: 'Group 1',
// // 					connectedGroup: {
// // 						name: 'Group 1',
// // 						nature: 'PUBLIC',
// // 						users: {
// // 							name: 'Alice',
// // 							role: 'ADMIN',
// // 						},
// // 					},
// // 				},
// // 			},
// // 			messages: {},
// // 		},
// // 	})
// // }

// // create()
// const allUsers = await prisma.user.findMany()
// console.log(allUsers)
