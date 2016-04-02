'use strict'
const express = require('express')
const AlbumPhotos = require('../app/controllers/albumcontroller')
const UserController = require('../app/controllers/usercontroller')

module.exports = function(app, multipartMiddleware, passport){
   

    app.get('/login', UserController.login)
	app.get('/signup', UserController.signup)

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		 failureRedirect : '/signup',
		 failureFlash : true
	}))

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	app.get('/profile', isLoggedIn, UserController.profile);
	app.get('/logout', UserController.logout)


    app.get('/cloud', isLoggedIn, AlbumPhotos.index);
    app.post('/upload', multipartMiddleware, AlbumPhotos.store)
    app.get('/delete/:id', AlbumPhotos.delete)



}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

