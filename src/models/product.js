"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.belongsTo(models.Category, {
				foreignKey: "categoryId",
				targetKey: "id",
				as: "categoryData",
			});
			Product.hasOne(models.Purchase, {
				foreignKey: "productId",
				as: "productData",
			});
		}
	}
	Product.init(
		{
			name: DataTypes.STRING,
			price: DataTypes.INTEGER,
			description: DataTypes.TEXT("long"),
			images: DataTypes.TEXT("long"),
			categoryId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			rating: DataTypes.FLOAT,
			price_before_discount: DataTypes.INTEGER,
			sold: DataTypes.INTEGER,
			view: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
