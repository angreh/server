"use strict";

module.exports = function ( sequelize, DataTypes )
{
	var piece = sequelize.define(
		"piece",
		{
			name: DataTypes.STRING,
			image: DataTypes.STRING,
			artistId: DataTypes.INTEGER
		}
	)

	piece.associate = ( models ) => {
		piece.belongsTo ( models.artist )
	}

	return piece
}