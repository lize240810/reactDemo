const {DataTypes, Model} = require('sequelize');
const crypto = require('crypto');


const sequelize = require("./db")

class User extends Model {
	verifyPassword(password) {
		const result = crypto.createHash('sha256').update(this.username + password).digest('hex')
		if (result === this.password) return true
	};

	toJSON() {
		const values = Object.assign({}, this.get());
		delete values.password;
		return values;
	}
}

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
		allowNull: false,
		set(value) {
			const password = crypto.createHash('sha256').update(this.username + value).digest("hex");
			this.setDataValue("password", password);
		}
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
	modelName: 'User',
	tableName: 'User'
});

module.exports = User
