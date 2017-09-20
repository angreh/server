var express = 		require ( 'express' ),
	path = 			require ( 'path' ),
	favicon = 		require ( 'serve-favicon' ),
	logger = 		require ( 'morgan' ),
	cookieParser = 	require ( 'cookie-parser' ),
	bodyParser = 	require ( 'body-parser' )
	methodOverride= require ( 'method-override' ),
	adaro = 		require ( 'adaro' ),
	fs = 			require ( 'fs' ),
	flash = 		require ( 'connect-flash' ),
	passport = 		require ( 'passport' ),
	session = 		require ( 'cookie-session' )


var app = express ()

// Adaro / DustJS: start
app.engine ( 'dust', adaro.dust () )
app.set ( 'view engine', 'dust' )
app.set ( 'views', 'src/templates' )
// Adaro / DustJS: end

// defaults: start
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// defaults: end

// Session: start
app.use ( session ({
	name: 'session',
	keys: ['admin', 'default']
}))
// Session: end

// Passport: start
app.use ( passport.initialize () )
app.use ( passport.session () )
// Passaport: end

// defaults: start
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// defaults: end

// connect-flash: start
app.use ( flash () )
app.use ( ( req, res, next ) => {
	res.locals.messages = require ( 'express-messages' )( req, res )
	next ()
})
// connect-flash: end

// routes: start
var routerRegiter = ( dir, fileList = [] ) => {
	fs.readdirSync ( dir ).forEach ( ( file ) => {
		const filePath = path.join( dir, file )
		if ( fs.statSync( filePath ).isDirectory() ) {
			routerRegiter ( filePath )
		} else {
			var rota = ( filePath == 'routes/index.js' ) ? '/' : filePath.slice ( 6, -3 )

			app.use (
				rota,
				require( './' + filePath.slice( 0,-3 ) )
			)
		}
	}) //forEach
} // routerregister
routerRegiter ( 'routes' )
// routes: end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
