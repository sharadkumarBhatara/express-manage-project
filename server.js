const http =require('http')
const express =require('express');
const dotenv =require('dotenv');
const path =require('path')
const app  =express();
//const router =express.Router();
const errorHandler =require('./middleware/err');
const routesC =require('./router/route.js');
//const logger =require('./middleware/logger');
const logger  =require('morgan');
const colors  =require('colors');
var bodyParser = require('body-parser');
const cookieParser =require("cookie-parser");
const todos =[{id:1,text:'One'},{id:2,text:'Two'},{id:3,text:'Three'}];

///const bootcamps =require('./router/route.js')  //used as controller
dotenv.config({path:'./configuration/config.env'});
app.use(bodyParser.json());
app.use(cookieParser());


/*const server = http.createServer((req,res)=>{
    const {header,url,method} =req;
    //res.setHeader('Conten-type','text/HTML');
   /// res.setHeader('Conten-type','application/json');
   // res.setHeader('x-powered-by','sharadBhatara');
    //res.write(todos);
   /* res.writeHead(200,{
        'content-type':'application/json',
    });
    console.log(res.getHeader('x-powered-by'))
    console.log(header,url,method);
res.end();
});


server.listen(process.env.PORT,()=>{
    console.log(`server runnige at ${process.env.PORT} port`);
});*/


//app.use('d/d/d/d',routec)
//app.use(logger);
app.use(logger('dev'));
app.use(routesC);
app.use(errorHandler);
/*router.get("/",(req,res)=>{
    console.log('dsfsfsdf');
    console.log(res.header);
    res.status(200).json({success:true,data:todos});
})*.*/
app.listen(process.env.PORT,()=>{
 console.log(`app listen at ${process.env.PORT} and env is ${process.env.NODE_ENV}`.green.bold);
});
//module.export = router;