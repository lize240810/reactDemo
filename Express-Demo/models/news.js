const {Sequelize, DataTypes, Model} = require('sequelize');

const db = require("./db")

const News = db.define('News', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	content: DataTypes.STRING,
	images: DataTypes.STRING,
	author: DataTypes.STRING,
	heat: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	views: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	type: {
		type: DataTypes.ENUM('multi', 'large', 'right', 'left'),
		defaultValue: 'multi'
	}, // 多图与大图模式 居左或居右
	isPublic: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	PublicTime: DataTypes.DATE
}, {
	timestamps: true
});

module.exports = News
