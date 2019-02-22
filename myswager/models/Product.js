const Sequelize = require('sequelize');
const { mysql } = require('../config/database');
const Category = require('./Category');
const SubCategory = require('./subcategory');
const Product = mysql.define('tbl_Product',{
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CId: {
        type: Sequelize.INTEGER
    },
    SUbCategoryId: {
        type: Sequelize.INTEGER
    }
}
);

SubCategory.belongsToMany(Category, { through: Product, foreignKey: 'CId', as:'category'});
Category.belongsToMany(SubCategory, { through: Product, foreignKey: 'SUbCategoryId' });
Product.belongsTo(Category, {foreignKey: 'CId', as:'category' });
Product.belongsTo(SubCategory, {foreignKey: 'SUbCategoryId' });

Product.sync({ force: false }).then((res) => {
    console.log('Table Create Succesfully');
}).catch((err) => {
    console.log('Error while creating table', err);
});

module.exports = Product;