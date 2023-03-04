import db from '$db/mongo'

export const mainUser = db.collection('user')
export const groups = db.collection('groups')
export const message = db.collection('message')
export const allUsers = db.collection('allUsers')
