'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title : {type: String, default: '', trim:true},
    cover : {type: String, default: '', trim:true},
})

AlbumSchema.path('title').required(true, 'Empty Title not allowed');
AlbumSchema.path('cover').required(true, 'Empty Photo not allowed');

AlbumSchema.statics.savePhotos = (url, cb) => {
    return this.save({$push: {photos : url}}, cb)
}
module.exports = mongoose.model('Album', AlbumSchema);
