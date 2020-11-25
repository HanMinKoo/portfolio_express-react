const express = require('express');
const crypto = require('crypto');

const router=express.Router();
const loginDB = require('../models/login_DB.js');

router.post('/process',(req,res)=>{
    console.log("req header좀 보자꾸나", req.headers);
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
            
            req.session.save(()=>{
                console.log('session save success');
                res.json({loginResult:'success'});
            });  
        }
    }
 });

 module.exports=router;