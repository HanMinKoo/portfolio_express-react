const express = require('express');
const crypto = require('crypto');
const router=express.Router();
const connectionDB= require('../models/connection_DB.js');

router.post('/',(req,res)=>{
    crypto.pbkdf2(req.body.password,'m9m9',8080,64,'sha512',(err,key)=>{
        console.log(key.toString('base64'));
        const password=key.toString('base64');
        const account=req.body.account;

        getUserInfo(account,password,req, res);
    });
 });

 function getUserInfo(account, password, req, res){
    const dbCon=connectionDB.connectDB();

    const query= `select account,id from web_portfolio1.user where account='${account}' and password='${password}'`;
    dbCon.query(query, (err,data)=>{
        
        if(err){
            console.log('table name:user / Error: select query Error : ',err);
            console.log(data); //undefined
        }
        else{
            console.log('table name:user / Result: query Success');
            console.log("asdasdasdasd",data[0]); //undefined면
        }
        if(data[0]===undefined) //db에서 id와 password에 부합하는 쿼리로 못찾았을 경우
            res.json({loginResult:'fail'});
        else{
            req.session.isLogined=true;
            req.session.account=data[0].account;
            req.session.user_id=data[0].id;
            
            req.session.save(()=>{
                console.log('session save success');
                res.json({loginResult:'success'});
            }); 
        }
        dbCon.end();
    });
}


 module.exports=router;