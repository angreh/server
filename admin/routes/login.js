var express = require ( 'express' ),
	passport = require ( 'passport' ),
	localStrategy = require ( 'passport-local' ).Strategy


var router = express.Router()

var ctl = require ( '../controllers/loginController' )
var models = require ( '../models' )
var User = models.user

passport.serializeUser ( function ( user, done )
{
	done ( null, user.id )
})

passport.deserializeUser ( function ( id, done )
{
	User
		.findById ( id )
		.then ( function ( user, err )
		{
			//console.log ( 'err', err, 'user', user )
    		done ( err, user )
  		})
})

passport.use ( new localStrategy (
	function ( username, password, done )
	{
		User.getUserByUsername ( username, function ( user, err )
		{
			//console.log ( '>>>>', err, '>>',  user )
			if ( err ) throw err;
			if ( !user )
			{
				console.log( 'Unknown User' )
				return done( null, false, { message: 'Unknown user' } )
			}

			//console.log( '>', username, '>', password, '>', user.password, '>>', user )

			User.comparePassword ( password, user.password, function( err, isMatch )
			{
				if ( err ) throw err
				if ( isMatch )
				{
					return done( null, user )
				}
				else
				{
					console.log( 'Invalid Password' )
					return done( null, false, { message: 'Invalid Password' } )
				}
			})
		})
	}
))

router.get ( '/', ctl.index )
router.post (
	'/',
	passport.authenticate (
		'local',
		{
			failureRedirect: '/login',
			failureFlash: 'Invalid username or password'
		}
	),
	ctl.authenticate
)
router.get ( '/logout', function ( req, res, next )
{
	req.logout ()
	console.log ( 'You have logged out' )
	req.flash ( 'success', 'You have logged out' )
	res.redirect ( '/login' )
})

module.exports = router;
