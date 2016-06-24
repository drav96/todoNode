/**
 * Created by Dragos on 20.06.2016.
 */
var pg = require('pg');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var conString = "postgres://postgres@localhost/world";
var User= require('../models/user');
module.exports = function(passport) {
    passport.use(new LocalStrategy(function (username, password, done) {
            
        User.findOne(username, function(err, user) {
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                return done(null, user);
            });
        }
    ));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });


    });
};