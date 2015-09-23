/* GHAP.com */
var fs = require('fs');
var express = require('express');
var pub = __dirname;
var app = express();
var routes = require('./routes');

app.set('views', __dirname + '/public/views');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

routes.addRoutes(app);

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
