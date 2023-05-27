"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
			},
			userName: {
				type: Sequelize.STRING,
			},
			roles: {
				type: Sequelize.STRING,
				defaultValue: "user",
			},
			address: {
				type: Sequelize.STRING,
			},
			date_of_birth: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			avatar: {
				type: Sequelize.BLOB("long"),
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
