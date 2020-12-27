/*****모듈 변수 설정*****/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlStore= require('express-mysql-session')(session);
const cors= require('cors');

/*****Router 변수 설정*****/
const inquireRouter=require('./routes/inquire_router.js')
const joinRouter=require('./routes/join_router.js');
const loginRouter=require('./routes/login_router.js');
const reservateionRouter=require('./routes/reservation_router.js');
const myPageRouter=require('./routes/mypage_router.js');
const adminPageRouter=require('./routes/admingpage_router.js');
const groundRouter = require('./routes/ground_router');
const reviewRouter = require('./routes/review_router');

require('dotenv').config();
const app = express();
const sessionStore= new mysqlStore
({
  host: process.env.DB_IP,
  user: process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port	:process.env.DB_PORT,
  database	:process.env.DB_DATABASE,
});
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 


app.use(session({  
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized:true, 
  store:sessionStore,
  cookie:{maxAge:6000000} ///1000분의 1초
}));
app.use(cors({
  credentials: true
}));
// app.get('/',(req,res)=>{
//   return res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.get('/session',(req,res,next)=>{
  console.log(req.session);
  console.log(path.join(__dirname, '../build'));
  
  return ((req.session.account!==undefined)? res.json({account:req.session.account, message:'FOUND ACCOUNT'}) :res.json({account:'', message:'NOT FOUND ACCOUNT'}));
//db에 session이 저장되어있으면 서버 껐다켜도 세션 안풀림. 
});
app.use('/login',loginRouter);
app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{ //세션을 완전히 삭제, 완전히 세션을 삭제했으니 브라우저가 다음에 웹에 접근할 때 다시 세션 발급됨.
      console.log(`session destroy err: `,err);
      res.json({result:'', message:err});
    }); 
});
app.use('/join',joinRouter);
app.use('/inquire',inquireRouter);
app.use('/reservation',reservateionRouter);
app.use('/mypage',myPageRouter);
app.use('/adminpage',adminPageRouter);
app.use('/ground',groundRouter);
app.use('/review', reviewRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ErrorResult:err});
});

module.exports = app;
