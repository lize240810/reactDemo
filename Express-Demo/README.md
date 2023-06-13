全栈进阶 用户表与新闻表进行连表操作

# 一、口水话

> 在之前的操作中，已经成功地创建了用户表和新闻表，并进行了简单的单表操作。但是，这两个表之间缺乏关联性，因此需要进行关联查询来实现更高效的数据查询和管理。
> 
> 通过关联查询，可以将两个表中的数据进行匹配，从而获得相关联的数据。例如，可以使用关联查询来查找特定用户所发布的新闻，或者查找某篇特定新闻的作者查找他发布的新闻列表。
> 
> 关联查询是一项非常有用的技能，可以帮更好地管理和分析数据，提高数据处理的效率。

### 数据表关联的好处
- 数据查询和分析更加高效：通过关联查询，可以将不同的数据表中的数据进行相关联，从而实现更高效的数据查询和分析。
- 数据冗余降低：通过关联查询，可以避免多张表中的数据冗余，从而节省存储空间和提高数据库的效率。
- 数据一致性得到保证：通过数据表关联，可以确保不同表中的数据一致性，避免数据不一致带来的问题。

### 数据表关联的坏处
- 处理复杂度增加：关联查询需要处理多个表中的数据，因此查询语句的复杂度可能会增加，从而增加数据处理的难度。
- 数据库性能下降：如果关联查询涉及到大量数据，可能会导致数据库性能下降，从而影响查询效率。
- 维护成本增加：关联查询需要涉及多个表，因此在维护数据库结构时可能需要更多的工作量，增加了维护成本。

# 二、 修改新闻接口
### 1. 更新表结构，加入关联外键 `models/index.js`
```js
const db = require("./db")
const User = require("./user")
const News = require("./news")

async function initDB() {
	await db.sync({alter: false});
	// 关联
	User.hasMany(News, {foreignKey: 'id'});
	News.belongsTo(User, {foreignKey: 'authorId'});
}

initDB().then()

```
### 2. 更新新闻发布接口
> 1. 我们新增了中间件，数据创建时，把当前登录用户的id传入了新闻表
```js
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
```

### 3. 更新修改接口
> 多一个用户条件
```js
router.put('/:id', authenticateJWT, async function (req, res) {
	try {
		const dbRes = await News.update({...req.body}, {
			where: {
				id: req.params.id,
				author_id: req.user.id
			}
		})

		res.json({data: dbRes[0]})
	} catch (e) {
		res.status(400).json({message: "修改失败"})
	}
});
```

### 4. 更新删除接口
> 新增用户条件
```js
router.delete('/:id', authenticateJWT, async function (req, res) {

	try {
		const dbRes = await News.destroy({where: {id: req.params.id, authorId: req.user.id}})
		res.status(201).json({data: dbRes})
	} catch (e) {
		res.status(400).json({message: "删除失败"})
	}
});
```

### 5. 更新查询全部新闻接口
> 目前的新闻有了作者之后，就可以给接口添加筛选条件，按照指定作者查询新闻 `/api/news?author=xxxx`
```js
router.get('/', async function (req, res) {
	const {page, pageSize, title, author} = req.query;
	const offset = (page - 1) * pageSize || 0;
	const limit = parseInt(pageSize) || 10;

	// 构造查询条件
	const where = {};
	if (title) {
		where.title = {
			[Op.like]: `%${title}%`
		};
	}

	if (author) {
		where.authorId = author
	}

	try {
		// 执行查询操作
		const news = await News.findAll({offset, limit, where, order: [['createdAt', 'DESC']]});

		// 查询总记录数
		const count = await News.count({where});

		// 计算总页数和当前页码
		const totalPages = Math.ceil(count / limit);
		const currentPage = Math.min(page, totalPages) || 1;

		const pagination = {total: count, currentPage, pageSize: limit, totalPages}

		res.json({data: news, pagination});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			code: -1, message: 'failed', data: {
				error
			}
		});
	}
})
```

### 6. 关联字段
> 之前的操作只是关联起来了，并没用到链表查，这次使用一下链表查询，让每个新闻返回它的作者，这样在我们的数据返回中就多了一个author 对象
```js
// 执行查询操作
const news = await News.findAll({
    offset, limit, where, order: [['createdAt', 'DESC']],
    include: {
        model: User, as: 'author', attributes: [['username', 'authorName']],
    }
})
```

### 7. 子查询条件
> 如果只查询出活跃用户发布的新闻则可以添加一个子查询
```js
const include = {
    model: User, as: 'author', attributes: [['username', 'authorName']],
    where: {
        isActive: true
    }
}
```

```js
// 执行查询操作
const news = await News.findAll({offset, limit, where, order: [['createdAt', 'DESC']], include})

// 查询总记录数
const count = await News.count({where, include});
```
