//
const ErrorResponse =require('../util/errorResponse');
const asyncHandler =require('../middleware/async');
const {getJWTToket,verifyToken} =require('../util/getJWTToken');
const path =require('path');
const appRoot = path.resolve(path.join(__dirname, "../"));
const pathSeparator = appRoot.indexOf("\\") >= 0 ? "\\" : "/";
const multer =require('multer')
var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, appRoot+"/public/uploads") 
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + "-" + Date.now()+path.extname( 
      file.originalname).toLowerCase()) 
  } 
}) 
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 5 * 1000 * 1000; 
var upload = multer({  
  storage: storage, 
  limits: { fileSize: maxSize }, 
  fileFilter: function (req, file, cb){ 
  
      // Set the filetypes, it is optional 
      var filetypes = /jpeg|jpg|png/; 
      var mimetype = filetypes.test(file.mimetype); 

      var extname = filetypes.test(path.extname( 
                  file.originalname).toLowerCase()); 
      
      if (mimetype && extname) { 
          return cb(null, true); 
      } 
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes); 
    }  

// mypic is the name of file attribute 
}).any()//single("mypic");        
/*var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(appRoot + "/public/uploads/"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: diskStorage }).any();*/

//const geocoder =require('../util/geocoder');
/*exports.getFiledata = (req,res,next)=>{
  try{
    return res.status(404).json({id:2,msg:'asdasdasdasd',hello:req.hello});
  }
  catch(err){
    next(new ErrorResponse(`Data Not Found`,404));
  }
  
 }*/
 exports.getFiledata = async(req,res,next)=>{
  console.log('dsafsadfsdaf');
    return res.send({success:true,msg:'sdfsdfsdf'});
 };

 //upload photo from bootcam
 exports.uploadPhoto = async (req,res,next) => {
    if(!req.files)
    { 
       return next(new ErrorResponse(`error in image`,400))
    }
  const file =req.file.files;
  file.name =`photo_${file}`;
  file.mv(`/upload/${filename}`,async err =>{
    if(err)
    console.log(error);
  })
 };
 exports.renderForm =async(req,res,next)=>{
   //res.render(__dirname+'/public/fileUpload.html');
   const path =require('path')
   res.sendFile(path.join(appRoot+'/public/fileUpload.html'));
 }
 exports.uploadImage =  async(req,res,next) =>{
  upload(req,res,function(err) { 
  
    if(err) { 

        // ERROR occured (here it can be occured due 
        // to uploading image of size greater than 
        // 1MB or uploading different file type) 
        res.send(err) 
    } 
    else { 

        // SUCCESS, image successfully uploaded 
        res.send("Success, Image uploaded!") 
    } 
}) 

 // upload.any();
 }
//authentication
exports.login =async(req,res,next)=>{
  const {email,pass} =req.body;
  if(!email||!pass)
  return next(new ErrorResponse('Invalid login',400));
  else
  {

  }
}
 //encryption password
 exports.pass = async (req,res,next)=>{
   const bcrypt =require('bcrypt');
   const salt = await bcrypt.genSalt(10);
   
   let password = await bcrypt.hash('123',salt);

   let dataRawait = await bcrypt.compare('123',password);
   let token =getJWTToket('123');

   //get token from headers
   //if(req.header.authorization&&req.header.authorization.startWith('Bearer'))
   {
     try{
      //token = req.header.authorization.split(' ')[1];
      //decode token
      const decode =await verifyToken(token)
      console.log(decode);
     }
      catch(err){
        console.log(err);
      }
   /*}
   else{
     //noit authorized*/
   }
   //end

   //forgot pasword
   const crypto = require('crypto');
   //reset password
   //gettojen
   const resetToken = await crypto.randomBytes(20).toString('hex');
   //hash token in set to respassword token
  let respass =await crypto.createHash('sha256').update(resetToken).digest('hex');
  let resetPassExpires = Date.now()+10*60*60*1000;
  console.log(resetToken);
   let options =await sendTokenResponse();
   res.status(200).cookie('token',token,options).json({data:`Hey i am here`,pass:password});

   //logout
   res.cookie('token','none',{
     expires: new Date(Date.now()+10*1000),
    httpOnly:true
   })
 }

 const sendTokenResponse= ()=>{
   return {
     expires: new Date(Date.now+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
     httpOnly:true,
   };
   
 }

//sending JWT token in cookies