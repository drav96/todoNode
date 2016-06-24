/**
 * Created by Dragos on 20.06.2016.
 */
var express=require('express');
var passport = require('passport');
var bodyParser=require('body-parser');
var path=require('path');
var cookieParser=require('cookie-parser');
var expressSession =require('express-session');
var pg = require('pg');
var app = express();

require('./config/passport')(passport);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(expressSession({
    secret:process.env.SESSION_SECRET || 'secret',
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());



var port=process.env.PORT || 1337;
require('./routes.js')(app, passport);
app.listen(port, function(){
   console.log("http://127.0.0.1:"+ port + '/');
});