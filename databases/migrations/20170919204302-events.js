'use strict';

module.exports = {

	up: (queryInterface, Sequelize) => {

		return queryInterface.createTable (
			'events_events',
			{
				id: Sequelize.INTEGER,
				title: Sequelize.STRING
			}
		)
	},

	down: (queryInterface, Sequelize) => {

		return queryInterface.dropTable ( 'events_events' )
	}
};
