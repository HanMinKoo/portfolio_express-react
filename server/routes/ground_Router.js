const express = require('express');
const connectionDB= require('../models/connection_DB.js');
const router = express.Router();

router.get('/img/:id',(req,res)=>{
    const dbCon=connectionDB.connectDB();
    const id = req.params.id;
    console.log('groundimgimgimgimgim');
    console.log('req.params.id:',req.params.id);
    // let query;
    // console.log('req.req.query.number:',req.query.number);
    
    (id ==='0') ? query=`select * from web_portfolio1.ground_img`
    : query=`select * from web_portfolio1.ground_img where ground_id=${id}`;

    dbCon.query(query, (err,imgData)=>{
        if(err){
            console.log('table name:ground_img / Error: select query Error : ',err);
            res.json({groundImg:imgData ,message:'이미지 데이터 가져오기 에러'});
        }
        else{
            console.log('table name:ground_img / Result: select query Success');
            res.json({groundImg:imgData , message:'이미지 데이터 가져오기 성공'});
        }
    });  
});


router.get('/information/:id',(req,res)=>{
    const id = req.params.id;
    
    const dbCon=connectionDB.connectDB();

    let query= `select * from web_portfolio1.ground`;

    dbCon.query(query, (err,groundInfo)=>{
        if(err)
            console.log('table name:ground / Error: select query Error : ',err);
        else
            console.log('table name:ground / Result: select query Success');
                    
        /*****운동장 리스트 페이지*****/
        if(id === '0')
            res.json({groundList:groundInfo}); 
         

        /*****운동장 상세 페이지*****/
        else{ 
            query=`select ground_time from web_portfolio1.ground_time_list where ground_id=${id}`;
            
            dbCon.query(query, (err,data2)=>{ //ground_id에 맞는 timetable DB불러오기
                if(err)
                    console.log('table name:ground_time_list / Error: select query Error : ',err);
                else
                    console.log('table name:ground_timetable / Result: query Success');
            
                res.json({groundList:groundInfo[id-1], groundTimeTable:data2, result:'success'});
            }); 
        }              
    });
 });
module.exports = router;