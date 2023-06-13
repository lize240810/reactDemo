const db = require("./db")
const User = require("./user")
const News = require("./news")

async function initDB() {
	await db.sync({alter: false});
	User.hasMany(News, {foreignKey: 'id', as: 'news'});
	News.belongsTo(User, {foreignKey: 'authorId', as: 'author'});
}

initDB().then()
