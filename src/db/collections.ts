import db from '$db/mongo'

export const mainUser = db.collection('user')
export const groups = db.collection('groups')
export const massagesCreate = db.collection('message')
