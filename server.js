'use strict'
require('./config/database')
const express = require('express')
const app = express();
const config = require('./config/general')
const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000
const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
const swig = require('swig')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const session      = require('express-session')
const flash    = require('connect-flash');

const multipart = require('connect-multiparty')
const multipartMiddleware = multipart();
require('./config/passport')(passport);

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    resave: true,
     secret: config.secret,
     saveUninitialized: true,
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/routes')(app, multipartMiddleware, passport)

app.engine('html', swig.renderFile);
app.set('views', config.root + '/app/views');
app.set('view engine', 'html');

app.use(express.static(config.root + '/public'));

app.listen(PORT, IP, () =>{
    console.log('Server Running on ' + IP + ":" + PORT )
})

