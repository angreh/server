'use strict'

exports.index = ( req, res ) => {
	res.render (
		'pages/index',
		{
			products: "products"
		}
	) // render
} // index
