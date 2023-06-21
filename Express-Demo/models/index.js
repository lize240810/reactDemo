const db = require("./db")
const User = require("./user")
const News = require("./news")
const Favorite = require("./favorite")

async function initDB() {
    await Favorite.sync({alter: false});
    // 一对一
    User.hasMany(News, {foreignKey: 'id', as: 'news'});
    News.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

    // 多对多
    News.belongsToMany(User, {through: Favorite});
    User.belongsToMany(News, {through: Favorite});
}

initDB().then()
