'use strict'
const Album = require('../models/album')
const cloudinary = require('cloudinary')
const fs = require('fs');
require('../../config/cloudinary')(cloudinary)

exports.index = (req, res) => {
    res.render('index')

}

exports.store = (req, res) => {
    const album = new Album(req.body)
       let imageFile = req.files.cover.path;
        cloudinary.uploader.upload(imageFile, {tags: 'cover'})
        .then(function(image){
                console.log("File Uploaded");
                album.cover = image.url;
                fs.unlink(imageFile, function(err){if(err)console.log(err); console.log("File Deleted")} )
                return album.save();
        }).then(function(album){
                console.log('Document Saved')
        }).finally(function(){
                res.json({sucess: true, message: "Everything its ok!"})
        })
}

/*DELETE IMAGE CLOUD FIRST AND THEN DOCUMENT*/
exports.delete = (req, res) => {
    const query  = {_id : req.params.id}
    Album.findById(query, (err, data)=> {
        if(err) throw err;
        let corteURL = data.cover.slice(61)
        let onlyId = corteURL.split(".")
        console.log(onlyId[0])
        cloudinary.uploader.destroy(onlyId[0])
        .then(function(image){
            console.log('Cloud Image Deleted')
            Album.remove(query, (err) => { if(err) throw err })
        }).then(function(data){
            console.log('Document Deleted')
        })
        .finally(function(){
           res.json({sucess: true, message: "Image Delete its ok!"})
        })
    })
}
