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
    },
    followTime: {
        type: DataTypes.DATE,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Favorite
