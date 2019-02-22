const Sequelize = require('sequelize');
const { mysql } = require('../config/database');
const Category = require('./Category');
const SubCategory = mysql.define('tbl_Subcategory',{
    SUbCategoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CId: {
        type: Sequelize.INTEGER
    },
    SubCategoryName: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
);
Category.hasMany(SubCategory, { foreignKey: 'CId', sourceKey: 'id' });
SubCategory.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = SubCategory;