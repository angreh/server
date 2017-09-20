"use strict";

module.exports = function ( sequelize, DataTypes )
{
	var artist = sequelize.define(
		"artist",
		{
			name: DataTypes.STRING
		}
	)

	//console.log ( '>>>>>>>', models )

	//artist.hasMany ( models.pieces, { as: 'pieces' } )

	artist.associate = ( models ) =>
	{
		artist.hasMany ( models.piece )
	}

	/*
	User.associate = function ( models )
	{
		User.hasMany ( models.Task )
	}
	*/

	return artist
}