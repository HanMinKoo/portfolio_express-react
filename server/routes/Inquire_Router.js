const express = require('express');
const nodemailer = require('nodemailer');
//const inquireDB= require('../models/Inquire_DB');
const connectionDB= require('../models/connection_DB.js');

const router = express.Router();
require('dotenv').config();


router.post('/progress', (req, res, next)=> {
 
    let userName=req.body.userName;
    let phoneNumber=req.body.phoneNumber;
    let content=req.body.content;

    console.log(userName,phoneNumber,content);
    let infoCheck='OK';

    let transporter = nodemailer.createTransport({ 
        service:'naver',
        auth:{
            user: process.env.INQUIRE_SEND_EMAIL_ID,
            
            pass:process.env.INQUIRE_SEND_EMAIL_PW
        }
    });
    
    let mailOption = {
        from: process.env.INQUIRE_SEND_EMAIL_ID,
        to:   process.env.INQUIRE_RECEIVE_EMAIL_ID,
        subject: `${userName}님으로부터 문의가 들어왔습니다.`,
        text: `내용: ${content} \n\n 휴대폰 번호: ${phoneNumber} \n\n 개인정보 동의: ${infoCheck}`,   
    };

    
    console.log(transporter);
    transporter.sendMail(mailOption, (err,info)=>{

        if(err){
            console.log('Email Sent Error: ',err);         
        }
        else{
            console.log('Email sent Success: ' , info.response);
            //inquireDB.save(userName,phoneNumber,content,infoCheck);
            save(userName,phoneNumber,content,infoCheck);  
            transporter.close();
        }
    });
    res.json({result:'ok'});
});

function save(userName,phoneNumber,content,infoCheck){
    const dbCon=connectionDB.connectDB();

    const query= `INSERT INTO web_portfolio1.inquire(name, phone, content, privacy_check) 
    VALUES('${userName}', '${phoneNumber}', '${content}', '${infoCheck}')`;

    dbCon.query(query, function(err,data){
        if(err){
            console.log('table name:inquire / Error: insert query Error : ',err);
        }
        else{
            console.log('table name:inquire / Result: insert Success');
            console.log(data);
            
        }
        dbCon.end();
    });
}

module.exports = router;
