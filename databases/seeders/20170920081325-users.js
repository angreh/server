'use strict';

module.exports = {
	up: ( queryInterface, Sequelize ) => {
		return queryInterface.bulkInsert (
			'users',
			[
				{
					username: "angreh",
					password: "$2a$06$0buq/KE.bATLR5tmGvgu1OKTcZtcWqL3sSu0Tf9Dtp/K/VFJHOJ.i" // 123
				}
			],
			{}
		)
	},

	down: ( queryInterface, Sequelize ) => {
		return queryInterface.bulkDelete ( 'users', null, {} )
	}
};