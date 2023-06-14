全栈进阶 用户点赞与评论

# 一、口水话

> 在之前的操作中，已经成功地创建了用户表和新闻表，并成功关联。但是，如果目前的一对一关联还达不到我们的要求。回忆一下平时的操作，用户点赞、取消点赞
> 等操作
>
> 一个用户可以点赞多篇新闻，同时一篇新闻也可以被多个用户点赞
>
> 多对多操作是指在一个系统中，多个参与方之间可以相互关联和交互，形成多个对多个的关系，从而实现对复杂问题的共同解决。

### 数据表关联的好处

- 增强了数据关联性：通过实现多对多关系，可以将相关的数据数量进行扩展、增加和更新，从而使数据之间更紧密地关联起来，让数据功能更加强大。
- 优化数据操作性能：采用多对多关系能够减少系统复杂度和重复数据存储的冗余性，并使得读取与写入数据的速度变得更快。
- 提高数据存储效率：利用中间表进行多对多关系处理可以节约存储空间，减少数据冗余，并且不容易引起数据不一致和错误。

### 数据表关联的坏处

- 复杂的数据库结构：多对多关系需要使用到中间表，因此在设计数据库结构时可能会增加许多关系，使数据库系统变得比较复杂难以维护。
- 处理关联数据困难：由于多对多关系需要使用中间表进行关联数据处理，需要设计合适的SQL语句和查询方法来进行数据访问和处理，这需要具有一定的技巧和经验。
- 数据完整性难以保持：在多对多关系中，数据之间的关系非常复杂，因此在管理数据时需要谨慎处理，并在设计数据库约束时要保持数据的完整性，以避免出现数据丢失或不一致的情况。

# 二、用户进行点赞操作

### 1. 创建一个中间表来记录他们之间的多对多关系

> 'models/favorite.js'

```js
const db = require("./db")
const {DataTypes} = require("sequelize");

const Favorite = db.define('Favorite', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	userId: {
		type: DataTypes.UUID,
		references: {
			model: 'User',
			key: 'id'
		}
	},
	newsId: {
		type: DataTypes.UUID,
		references: {
			model: 'News',
			key: 'id'
		}
	}
});

module.exports = Favorite
```

### 2. 创建多对多关联

> `model/index.js`

```js
const User = require("./user")
const News = require("./news")
const Favorite = require("./favorite")

async function initDB() {
	// xxxx

	// 多对多
	News.belongsToMany(User, {through: Favorite});
	User.belongsToMany(News, {through: Favorite});
}

initDB().then()
```

### 3. 创建新闻点赞接口

> 这里也可以使用多对多的关联查询来进行操作，只是我个人觉得这样更方便一些

```js
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
```


### 4. 统计当前新闻被点赞数，当前用户是否点赞
```js
router.get('/:id', authenticateUser, async function (req, res) {
	try {
		const newData = await News.findByPk(req.params?.id);
		await newData.increment('views', {
			by: 1
		})
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
```
- 使用了 `getAuthor()` 查询了当前新闻的作者，这是上一篇一对多的关联查询
- 使用了 `countUsers()` 查询了当前新闻的所有点赞数，这是多对多的关联查询
- 使用了 `hasUsers()` 查询了当前新闻，当前登录用户是否关联了


### 5. 查询全部新闻中使用
> 预加载 先查询关联的用户
```js
	const include = [{
		model: User, as: 'author', attributes: [['username', 'authorName']],
		where: {
			isActive: true
		}
	}, {
		model: User,
		attributes: ['id'],
		through: {attributes: ['id']},
	}]
```
