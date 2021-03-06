'use strict';

module.exports = {

	up: function ( queryInterface, Sequelize )
	{
		return queryInterface.createTable(
			'users',
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false
				},
				createdAt: {
					type: Sequelize.DATE,
					allowNull: false,
					default: Sequelize.NOW
				},
				updatedAt: Sequelize.DATE
			}
		)
	},

	down: function ( queryInterface, Sequelize )
	{
		return queryInterface.dropTable ( 'users' )
	}
}