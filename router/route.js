const express =require('express');
var router = express.Router();
const {getFiledata,uploadPhoto,pass,renderForm,uploadImage} = require('../requestModule/controller.js');
router.route("/").get(getFiledata).post(getFiledata); 
//router.route("/:id").get(getFiledata).post(getFiledata).put(getFiledata).delete(getFiledata); 
//router.route("/:id/photo").get(uploadPhoto)
router.route('/password').get(pass);
router.route('/uploadPhoto').get(renderForm).post(uploadImage);
module.exports =router;