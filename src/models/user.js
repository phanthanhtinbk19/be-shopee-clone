"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	User.init(
		{
			email: DataTypes.STRING,
			userName: DataTypes.STRING,
			roles: DataTypes.STRING,
			address: DataTypes.STRING,
			date_of_birth: DataTypes.STRING,
			password: DataTypes.STRING,
			phone: DataTypes.STRING,
			avatar: DataTypes.BLOB("long"),
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
