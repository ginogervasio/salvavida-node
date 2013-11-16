var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// load global config file based on environment
var config = require('./config')(app.get('env'));
global.config = config;

// connect to the database
mongoose.connect(config.mongoUrl);

// load routes
var routes = require('./routes');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: config.sessionSecret }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
}
else
{
  app.use(express.errorHandler()); 
}

// Routes
// app.get('/', routes.index);

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
