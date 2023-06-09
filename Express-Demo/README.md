全栈进阶 基于sequelize实现新闻的增删改查接口

# 一、口水话

> 一个系统一开始可能只需要实现增删改查这些基本操作，但是随着业务的发展和需求的变化，功能需求会不断增加，相应的业务逻辑也会不断扩展。例如：

- 增加权限管理功能，对某些敏感数据进行权限控制。
- 增加搜索功能，让用户能够快速找到需要的数据。
- 增加批量操作功能，让用户能够同时对多个数据进行管理。
- 增加导入导出功能，方便用户将数据导入

### 1. 准备工作

> 创建清晰的目录

1. 创建router文件 `routes/api/news/index.js` 文件
2. 在api目录下创建 `index.js`文件
3. 在 `api/index.js` 文件中挂载 News的router
    ```js
    const express = require("express");
    const router = express.Router();
    
    router.use("/news", require("./news"))
    module.exports = router;
    ```
4. 再把api挂载到routers中

```js
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.use("/api", require("./api"))

module.exports = router;
```

# 二、 新增新闻接口

> 开始创建接口与逻辑控制

### 1. 编写一个测试文件看是否能访问到

> 我没问题 能访问 http://localhost:3001/api/news

```js
const express = require('express');
const News = require('../../../models/news');

const router = express.Router();

router.get('/', function (req, res) {
	res.send("测试")
});

router.post('/', function (req, res) {
	res.json(req.body)
});

module.exports = router;
```

### 2. 修改 post 接口

> 根据Model 我们需要接收一个必传参数 title，其他的都可以为非必填，对于非空验证

- 自定义验证
- 写中间件验证
- 第三方库验证 **joi**，**validator**
- Sequelize内置验证

```js
router.post('/', async function (req, res) {
	if (!req.body?.title) {
		return res.status(400).json({
			message: '新闻标题不允许为空'
		})
	}
	const dbRes = await News.create(req.body)
	return res.json(dbRes)
});
```

### 3. get查询新闻列表

- 普通全查询

```js
router.get('/', async function (req, res) {
	const dbRes = await News.findAll()
	return res.json(dbRes)
});
```

- 带条件搜索与分页全查询

```js
router.get('/', async function (req, res) {
	const {page, pageSize, title} = req.query;
	const offset = (page - 1) * pageSize || 0;
	const limit = parseInt(pageSize) || 10;

	// 构造查询条件
	const where = {};
	if (title) {
		where.title = {
			[Op.like]: `%${title}%`
		};
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
			code: -1,
			message: 'failed',
			data: {
				error
			}
		});
	}
})
```

- 根据ID指定查询

```js
router.get('/:id', async function (req, res) {
	const dbRes = await News.findByPk(req.params?.id);
	res.json({
		data: dbRes
	});
})
```

### 4. put 根据ID修改，只修改部分字段

```js
router.put('/:id', async function (req, res) {

	try {
		const dbRes = await News.update({...req.body}, {
			where: {
				id: req.params.id
			}
		})
		res.json({
			data: dbRes
		})
	} catch (e) {
		res.status(400).json({message: "修改失败"})
	}
});
```

### 5. delete 根据ID删除数据

```js
router.delete('/:id', async function (req, res) {
	try {
		const dbRes = await News.destroy({where: {id: req.params.id}})
		res.status(201).json({data: dbRes})
	} catch (e) {
		res.status(400).json({message: "删除失败"})
	}
});
```

### 6. 浏览次数递增

> 在每次访问时 浏览次数递增，而且不会遇到并发问题

```js
router.get('/:id', async function (req, res) {
	const dbRes = await News.findByPk(req.params?.id);
	await dbRes.increment('views', {
		by: 1
	})
	res.json({
		data: dbRes
	});
})
```

# 三、创建一个图片上传接口

> 以上我们已经可以对新闻文本数据进行增删改查了，接下来创建一个图片上传接口，为我们的新增增加色彩

### 1. 安装第三方依赖 **multer**

> multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的请求数据。

### 2. 创建一个upload的接口文件

> `routes/api/upload.js`

### 2. 编写路由中间件

> `routes/api/upload.js`

```js
const path = require('path')
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const folderPath = 'public/uploads'
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, {recursive: true});
		}
		cb(null, folderPath)
	}, filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({storage: storage})
```

### 3. 创建一个upload的接口

> 接下来就可以 进行上传测试了

```js
router.post('/', upload.single('file'), (req, res, next) => {
	const {file} = req;
	if (!file) {
		const error = new Error('Please upload a file');
		error.httpStatusCode = 400;
		return next(error);
	}
	const fileUrl = `/uploads/${file.filename}`;

	res.send({
		data: fileUrl
	});
});
```




