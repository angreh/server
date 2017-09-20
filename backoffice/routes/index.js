"use strict"

var express = 	require ( 'express' ),
	ctl = 		require ( '../controllers/indexController' )


var router = express.Router ()

router.get ( '/', ctl.index )

module.exports = router;
