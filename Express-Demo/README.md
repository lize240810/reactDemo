全栈进阶 新增用户模块，实现登录、注册、权限管理

# 一、口水话

> 一个系统通常需要有一个用户管理模块。用户管理模块负责管理系统中的用户信息，包括用户注册、登录、权限管理等功能。其核心功能包括用户身份验证和访问控制，这些仅仅是用户管理模块的一些基本功能。随着系统规模的增长，可能需要更多高级的功能和定制化需求，例如多种身份验证方式、单点登录、组织结构管理等

- 用户注册：允许用户创建新账户并存储其基本信息，例如用户名、密码、电子邮件地址等
- 用户登录：验证用户的凭据，以便他们可以在系统中进行身份验证和访问控制
- 用户资料管理：允许用户查看和更新他们的个人资料信息
- 密码重置：允许用户通过提供与其帐户关联的电子邮件地址来重置其密码
- 权限管理：管理哪些用户能够访问哪些资源和操作
- 用户管理界面：提供易于使用的管理界面，允许管理员查看、编辑和删除用户信息

# 二、创建用户模型
### 1. 创建一个基础用户模型
```js
class User extends Model {}
User.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	avatar: DataTypes.STRING,
	phone: DataTypes.STRING,
	isActive: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
}, {
	sequelize,
	timestamps: true,
	modelName: 'User'
});
```

### 2. 使用Sequelize设置器 为用户密码存储加密
- Node.js 内置的 crypto 模块中的 Hash 对象进行 SHA256 哈希加密，并返回十六进制编码的散列值
```js
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
```
- Sequelize 在将数据发送到数据库之前自动调用了设置器. 数据库得到的唯一数据是已经散列过的值.
```js
password: {
		type: DataTypes.STRING,
		  allowNull: false,
		  set(value)
		{
			this.setDataValue("password", hash.update(this.username + value).digest("hex"));
		}
	}
```

### 3. 添加一个密码验证的方法
```js
class User extends Model {
	verifyPassword(password) {
		const result = hash.update(this.username + password).digest("hex");
		if (result === this.password) {
			console.log('密码相同');
		} else {
			console.log('密码不同');
		}
	};
}
```

# 三、创建user接口
### 1. 创建用户注册接口
```js
router.post("/register", async function (req, res, next) {
	const {username, password} = req.body
	let message = undefined
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
```

- 创建查询接口
> 通过接口可以看到密码已经被加密了
```js
router.get("/", async function (req, res, next) {
	const users = await User.findAll()
	res.json(users)
})
```

### 2. 创建登录接口
- 使用了verifyPassword 验证密码
```js
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
						token: "",
						user: dbRes.toJSON()
					}
				})
				return
			}
		}
	}
	res.status(400).json({message})
})
```
- 如果不想要返回密码我们可以重写toJSON 方法
```js
class User extends Model {
	toJSON() {
		const values = Object.assign({}, this.get());
		delete values.password;
		return values;
	}
}
```

# 四、生成用户token，实现用户身份验证
### 1. 使用第三方库
```shell
pnpm i jsonwebtoken
```
### 2. 定义生成JWT的方法
```shell
const secret = 'secret'

const generateToken = (user) => {
	console.log(user, "user")
	const payload = {name: user.username, id: user.id}
	const options = {expiresIn: '7d'}
	return jwt.sign(payload, secret, options)
}
```
### 3. 定义中间件函数，验证 JWT
```js
const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({message: '未授权的访问'})
	}

	try {
		req.user = jwt.verify(token, secret);
		next()
	} catch (err) {
		res.status(401).json({message: '身份验证失败'})
	}
}
```
### 4. 通过jwt 验证用户
> 注：**在登录时，就把token返回给用户**
#### 1. 创建一个获取当前登录用户的接口
> 接口在请求时候 需要带上请求头 **authorization**
> 
> 案例：{authorization: Bearer `${token}`}
```js
router.get("/me", authenticateUser, async function (req, res, next) {
	if (req?.user?.id) {
		const user = await User.findByPk(req?.user?.id)
		res.json(user)
	}
})
```
