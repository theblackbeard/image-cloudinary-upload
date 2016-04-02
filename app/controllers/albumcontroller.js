'use strict'
const cloudinary = require('cloudinary')
const fs = require('fs');
require('../../config/cloudinary')(cloudinary)

exports.index = (req, res) => {
    res.render('index')

}

exports.store = (req, res) => {
       let imageFile = req.files.photo.path;
        cloudinary.uploader.upload(imageFile, {tags: 'cover'})
        .then(function(image){
                console.log("File Uploaded");
                fs.unlink(imageFile, function(err){if(err)console.log(err); console.log("File Deleted")} )
                 return res.render('index', {result: image})              
        })
}

/*DELETE IMAGE CLOUD FIRST AND THEN DOCUMENT*/
exports.delete = (req, res) => {
        cloudinary.uploader.destroy(req.params.id)
        .then(function(image){
            console.log('Cloud Image Deleted')
            res.redirect('/')
        })
}
