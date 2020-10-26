const express = require('express');
const crypto = require('crypto');

const router=express.Router();
const loginDB = require('../models/login_DB.js');

// router.get('/',(req,res)=>{
//     console.log("login page render");
//    //console.log(req.session);
//    if(req.session.loginText ===true){
//         req.session.loginText=null;
//         res.render('login',{text:'아이디 또는 비밀번호를 확인해주세요.'});
//    }
//    else
//         res.render('login',{text:''});
// });


router.post('/process',(req,res)=>{
    console.log(req.body);
    let password;

    crypto.pbkdf2(req.body.password,'m9m9',8080,64,'sha512',(err,key)=>{
        console.log(key.toString('base64'));
        password=key.toString('base64');
        account=req.body.account;
        loginDB.getUserInfo(account,password,authCheck);
      
    });


    function authCheck(result,account,user_id){
        console.log("result:",result);
        
        if(result==='fail')
            res.json({loginResult:'fail'});
        else //result ==='success'
        {
            req.session.isLogined=true;
            req.session.account=account;
            req.session.user_id=user_id;
            
            //console.log("adasdadasdasdasd  ",req);
            //console.log("req.sessionID",req.sessionID);
            req.session.save(()=>{
                console.log('session save success');
                res.cookie('sessionID',req.sessionID,{maxAge:6000000,httpOnly:true});
                res.send({
                    loginResult:'success',
                    
                });
            });  
        }
    }
 });

 module.exports=router;