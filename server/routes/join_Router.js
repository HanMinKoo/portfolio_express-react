const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const joinDB = require('../models/join_DB.js');
const connectionDB= require('../models/connection_DB.js');

router.post('/checkduplication',(req,res)=>{
    console.log("body의 value값",req.body);
    const dbCon=connectionDB.connectDB();
    let query;
    if(req.body.type==='text')
        query=`select * from web_portfolio1.user where account='${req.body.value}'`;
    else if(req.body.type==='email')
        query=`select * from web_portfolio1.user where email='${req.body.value}'`;

    dbCon.query(query, (err,userInfo)=>{
        if(err)
            console.log('table name:user / Error: select query Error : ',err);
        else{
            console.log('table name:user / Result: select query Success');
            console.log(userInfo[0]);
            
            (userInfo[0]===undefined) ? res.json({result:"notFound", message:'사용 가능합니다.'}) : res.json({result:"found", message:'이미 존재합니다.'}) 
        }
        dbCon.end();
    });
});
//201107 회원가입 코드 비구조화 할당으로 바꾸고 검토안해봄.
router.post('/progress', (req,res)=>{
    console.log('회원가입 req body:',req.body);
    const {userName, userEmail, account, userPassword1} = req.body;
    
    crypto.pbkdf2(userPassword1,'m9m9',8080,64,'sha512',(err,key)=>{
        console.log("base64 인코딩 후 key값:",key.toString('base64'));
        const password=key.toString('base64');
        joinDB.saveUser(userName, userEmail, password, res, account);
    });
});

module.exports=router;