const jwt = require('jsonwebtoken')
const User = require("../models/user");

const secret = 'express-download'


/**
 * 定义中间件函数，生成 JWT
 * @param user
 * @returns {*}
 */
const generateToken = (user) => {
	console.log(user, "user")
	const payload = {name: user.username, id: user.id}
	const options = {expiresIn: '7d'}
	return jwt.sign(payload, secret, options)
}

/**
 *  定义中间件函数，验证 JWT
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({message: '未授权的访问'})
	}

	try {
		const _user = jwt.verify(token, secret);
		User.findByPk(_user.id).then(user => {
			if (user) {
				req.user = user
				next()
			} else {
				res.status(401).json({message: '身份验证失败'})
			}
		})
	} catch (err) {
		res.status(401).json({message: '身份验证失败'})
	}
}

/**
 *  定义中间件函数，验证 用户
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return next()

	try {
		req.user = jwt.verify(token, secret);
		next()
	} catch (err) {
		res.status(401).json({message: '身份验证失败'})
	}
}

module.exports = {
	generateToken, authenticateJWT, authenticateUser
}
