const db = require("./db")
require("./news")

async function initDB() {
	await db.sync({alter: false});
}

initDB().then()
