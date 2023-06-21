const express = require('express');
const News = require('../../../models/news');
const {Op} = require("sequelize");
const {authenticateJWT, authenticateUser} = require("../../../utils/token");
const User = require("../../../models/user");
const Favorite = require('../../../models/favorite');

const router = express.Router();

router.get('/', authenticateUser, async function (req, res) {
    const {page, pageSize, title, author} = req.query;
    const offset = (page - 1) * pageSize || 0;
    const limit = parseInt(pageSize) || 10;

    // 构造查询条件
    const where = {};
    const include = [{
        model: User, as: 'author', where: {isActive: true},
        attributes: [['username', 'authorName']]
    }]

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
            include,
            raw: true
        })

        if (req.user?.id) {
            const favorites = await Favorite.findAll({
                where: {
                    newsId: rows.map(item => item.id),
                    userId: req.user.id
                },
                attributes: ["followTime", "isRead", "id", "newsId"],
            })
            rows.forEach(res1 => {
                res1["favorite"] = favorites.find(res2 => res1.id === res2.newsId)
            })
        }

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

router.get('/:id', authenticateUser, async function (req, res) {
    try {
        const newData = await News.findByPk(req.params?.id);
        await newData.increment('views', {by: 1})
        const author = await newData.getAuthor()
        const total = await newData.countUsers()
        const isLike = await newData.hasUsers(req.user.id)
        res.json({
            data: {
                ...newData.toJSON(), author, total,
                isLike
            }
        });
    } catch (e) {
        console.error(e)
        res.status(400).json({
            message: "网络出现异常"
        });
    }
})

router.post('/:id/favorite', authenticateJWT, async function (req, res) {
    try {
        const [favorite, status] = await Favorite.findOrCreate({
            where: {
                userId: req.user.id,
                newsId: req.params.id,
            }
        })

        // 取消点赞
        if (!status) favorite.destroy()

        Favorite.count({where: {newsId: req.params.id}}).then(count => {
            News.update({
                likeTotal: count
            }, {
                where: {
                    id: req.params.id
                }
            })
        })

        return res.json({
            data: {
                isFavorite: status
            },
            message: `${status ? '成功' : '取消'}点赞`
        })
    } catch (e) {
        res.send(e)
    }
});

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
