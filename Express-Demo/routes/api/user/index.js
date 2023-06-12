const express = require('express');
const User = require('../../../models/user');
const {Op} = require("sequelize");
const {generateToken, authenticateUser} = require("../../../utils/token");

const router = express.Router();

router.get("/", async function (req, res, next) {
	const users = await User.findAll()
	res.json(users)
})

router.post("/register", async function (req, res, next) {
	const {username, password} = req.body
	let message = ''
	if (!username || !password) {
		message = "用户名或账号不允许为空"
	} else {
		const dbRes = await User.findOne({
			where: {
				username
			}
		})
		if (dbRes) {
			message = "用户名已经被注册"
		} else {
			const user = await User.create({username, password})
			return res.json({data: user})
		}
	}
	res.status(400).json({message})

})

router.post("/login", async function (req, res, next) {
	const {username, password} = req.body
	let message = ''
	if (!username || !password) {
		message = "用户名或账号不允许为空"
	} else {

		const dbRes = await User.findOne({
			where: {
				username
			}
		})
		if (!dbRes) {
			message = "用户名未注册"
		} else {
			const verify = dbRes.verifyPassword(password)
			if (!verify) {
				message = "密码不正确"
			} else {
				res.json({
					data: {
						token: generateToken(dbRes),
						user: dbRes.toJSON()
					}
				})
				return
			}
		}
	}
	res.status(400).json({message})
})

router.get("/me", authenticateUser, async function (req, res, next) {
	if (req?.user?.id) {
		const user = await User.findByPk(req?.user?.id)
		res.json(user)
	}
})


module.exports = router
