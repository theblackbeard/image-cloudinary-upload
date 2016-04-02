'use strict'
const express = require('express')
const app = express();
const config = require('./config/general')
const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000
const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
const swig = require('swig')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


require('./config/routes')(app, multipartMiddleware)

app.engine('html', swig.renderFile);
app.set('views', config.root + '/app/views');
app.set('view engine', 'html');

app.use(express.static(config.root + '/public'));

app.listen(PORT, IP, () =>{
    console.log('Server Running on ' + IP + ":" + PORT )
})

