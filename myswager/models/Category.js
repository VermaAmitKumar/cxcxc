const Sequelize = require('sequelize');
const { mysql } = require('../config/database');

const Category = mysql.define('tbl_Category',{
    CId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CategoryName: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
);

Category.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Category;