"use strict"

var
	express = 		require ( 'express' ),
	path = 			require ( 'path' ),
	favicon = 		require ( 'serve-favicon' ),
	logger = 		require ( 'morgan' ),
	cookieParser = 	require ( 'cookie-parser' ),
	bodyParser = 	require ( 'body-parser' ),
	fs = 			require ( 'fs' ),
	adaro =			require ( 'adaro' ),
	flash = 		require ( 'connect-flash' ),
	passport = 		require ( 'passport' ),
	session = 		require ( 'cookie-session' )
const
	i18next = 		require ( 'i18next' ),
	i18nextMid = 	require ( 'i18next-express-middleware' ),
	Backend = 		require ( 'i18next-node-fs-backend' )


var app = express()

// i18next: start
i18next
	.use ( Backend )
	.use ( i18nextMid.LanguageDetector )
	.init ({
		backend: {
			loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
			addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
		},
		fallbackLng: 'en',
		preload: [ 'en', 'de' ],
		saveMissing: true
	})
app.use ( i18nextMid.handle ( i18next ) )
// i18next: end

// Adaro / DustJS : start
var options = {
	helpers: [
		// i18next helper
		( dust ) => {
			dust.helpers.get = ( chunk, context, bodies, params ) => {
				return chunk.write ( context.options.locals.t( params.text ) )
			}
		}
	]
}
app.engine ( 'dust', adaro.dust ( options ) )
app.set ( 'view engine', 'dust' )
app.set ( 'views', 'src/templates' )
// Adaro / DustJS : end

// Express default: start
app.use ( favicon ( path.join ( __dirname, 'public', 'favicon.ico' ) ) )
app.use ( logger ( 'dev' ) )
app.use ( bodyParser.json () )
app.use ( bodyParser.urlencoded ({ extended: false }) )
// Express defaults: end

// Sessions: start
app.use ( session ({
	name: 'session',
	keys: ['hmmm', 'kkkk']
}))
// Session: end

// Passport: start
app.use ( passport.initialize () )
app.use ( passport.session () )
// Passaport: end

// Express defaults: start
app.use ( cookieParser () )
app.use ( express.static ( path.join ( __dirname, 'public' ) ) )
// Express defaults: end

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
app.use ( ( req, res, next ) => {
	var err = new Error ( 'Not Found' )
	err.status = 404
	next ( err )
})

// error handler
app.use ( ( err, req, res, next ) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get ( 'env' ) === 'development' ? err : {}

	// render the error page
	res.status ( err.status || 500 )
	res.render ( 'error' )
})

module.exports = app
