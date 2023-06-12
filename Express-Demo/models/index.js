const db = require("./db")
require("./news")
const User = require("./user")

async function initDB() {
	await db.sync({alter: false});
}

initDB().then()
