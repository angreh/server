exports.index = ( req, res ) => { res.render( 'login/index' ) }

exports.authenticate = ( req, res ) => {
	console.log ( 'Authentication Successful' )
	req.flash ( 'success', 'You are logged in' )
	res.redirect ( '/admin' )
}