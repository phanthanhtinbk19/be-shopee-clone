"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Purchase extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Purchase.belongsTo(models.Product, {
				foreignKey: "productId",
				targetKey: "id",
				as: "productData",
			});
		}
	}
	Purchase.init(
		{
			buyCount: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			price_before_discount: DataTypes.INTEGER,
			status: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Purchase",
		}
	);
	return Purchase;
};
