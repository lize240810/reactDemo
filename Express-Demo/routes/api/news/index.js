const express = require('express');
const News = require('../../../models/news');
const {Op} = require("sequelize");
const {authenticateJWT} = require("../../../utils/token");
const User = require("../../../models/user");

const router = express.Router();

router.get('/', async function (req, res) {
	const {page, pageSize, title, author} = req.query;
	const offset = (page - 1) * pageSize || 0;
	const limit = parseInt(pageSize) || 10;

	// 构造查询条件
	const where = {};
	const include = {
		model: User, as: 'author', attributes: [['username', 'authorName']],
		where: {
			isActive: false
		}
	}

	if (title) {
		where.title = {
			[Op.like]: `%${title}%`
		}
	}

	if (author) where.authorId = author

	try {
		// 执行查询操作
		const {count, rows} = await News.findAndCountAll({
			offset,
			limit,
			where,
			order: [['createdAt', 'DESC']],
			include
		})

		// 计算总页数和当前页码
		const totalPages = Math.ceil(count / limit);
		const currentPage = Math.min(page, totalPages) || 1;

		const pagination = {total: count, currentPage, pageSize: limit, totalPages}

		res.json({data: rows, pagination});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			code: -1, message: 'failed', data: {
				error
			}
		});
	}
})

router.get('/:id', async function (req, res) {
	try {
		const dbRes = await News.findByPk(req.params?.id);
		await dbRes.increment('views', {
			by: 1
		})
		res.json({
			data: dbRes
		});
	} catch (e) {
		res.status(400).json({
			message: "网络出现异常"
		});
	}
})

router.post('/', authenticateJWT, async function (req, res) {
	if (!req.body?.title) {
		return res.status(400).json({
			message: '新闻标题不允许为空'
		})
	}
	const dbRes = await News.create({...req.body, authorId: req.user.id})
	return res.json({
		data: dbRes
	})
});

router.put('/:id', authenticateJWT, async function (req, res) {

	try {
		const dbRes = await News.update({...req.body}, {
			where: {
				id: req.params.id,
				authorId: req.user.id
			}
		})

		res.json({data: dbRes[0]})
	} catch (e) {
		res.status(400).json({message: "修改失败"})
	}
});

router.delete('/:id', authenticateJWT, async function (req, res) {
	try {
		const dbRes = await News.destroy({where: {id: req.params.id, authorId: req.user.id}})
		res.status(201).json({data: dbRes})
	} catch (e) {
		res.status(400).json({message: "删除失败"})
	}
});

module.exports = router;
