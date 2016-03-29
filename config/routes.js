'use strict'
const express = require('express')
const AlbumPhotos = require('../app/controllers/albumcontroller')
module.exports = function(app, multipartMiddleware){
    app.get('/', AlbumPhotos.index);
    app.post('/upload', multipartMiddleware, AlbumPhotos.store)
    app.delete('/album/:id/delete', AlbumPhotos.delete)
}

