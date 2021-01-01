const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const connectionDB= require('../models/connection_DB.js');

// router.get('/duplication/:typevalue',(req,res) => {
//     console.log(req.params.typevalue);
//     const typevalue=req.params.typevalue.split('-');
//     const type = typevalue[0];
//     const value = typevalue[1];

//     const dbCon=connectionDB.connectDB();

//     let query;
//     if(type==='text')
//         query=`select * from web_portfolio1.user where account='${value}'`;
//     else if(type==='email')
//         query=`select * from web_portfolio1.user where email='${value}'`;

//     dbCon.query(query, (err,userInfo)=>{
//         if(err)
//             console.log('table name:user / Error: select query Error : ',err);
//         else{
//             console.log('table name:user / Result: select query Success');
//             console.log(userInfo[0]);
            
//             (userInfo[0]===undefined) ? res.json({result:"notFound", message:'사용 가능합니다.'}) : res.json({result:"found", message:'이미 존재합니다.'}) 
//         }
//         dbCon.end();
//     });
// });

router.get('/duplication/:email',(req,res)=>{
    const email = req.params.email;
    checkDuplication('email', email, res);
});

router.get('/duplication/:id',(req,res)=>{
    const id = req.params.id;
    checkDuplication('id', id, res);
});

function checkDuplication(type, data, res){
    const dbCon=connectionDB.connectDB();
    const query = `select * from web_portfolio1.user where ${type}='${data}'`;

    dbCon.query(query, (err,result)=>{
        if(err)
            console.log('table name:user / Error: select query Error : ',err);
        else{
            console.log('table name:user / Result: select query Success');
            console.log(result[0]);
            
            (result[0]===undefined) ? res.json({result:"notFound", message:`사용 가능한 ${type}입니다.`}) : res.json({result:"found", message:`이미 존재하는 ${type}입니다.`}) 
        }
        dbCon.end();
    });
}


router.post('/', (req,res)=>{
    console.log('회원가입 req body:',req.body);
    const {userName, userEmail, account, userPassword1} = req.body;
    
    crypto.pbkdf2(userPassword1,'m9m9',8080,64,'sha512',(err,key)=>{
        console.log("base64 인코딩 후 key값:",key.toString('base64'));
        const password=key.toString('base64');
        saveUser(userName, userEmail, password, res, account);
    });
});

function saveUser(userName, userEmail, userPassword,response,userId){
    const dbCon=connectionDB.connectDB();

    const query= `INSERT INTO web_portfolio1.user(account, name, email, password) 
    VALUES('${userId}','${userName}', '${userEmail}', '${userPassword}')`;

    dbCon.query(query, function(err,data){
        if(err){
            console.log('table name:user / Error: insert query Error : ',err);
            response.json({result:'fail', message:err});
        }
        else{
            console.log('table name:user / Result: insert Success');
            console.log(data);
            response.json({result:'success', mesaage:data});
        }
        dbCon.end();
    });
}




module.exports=router;