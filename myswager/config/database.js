const Sequelize = require('sequelize');
const Option = Sequelize.Op;

exports.mysql = new Sequelize('demo', 'root','root',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: Option,
});

if (exports.mysql) {
    console.log("connected");
}