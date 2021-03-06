const express = require('express');
const connectionDB= require('../models/connection_DB.js');
const router = express.Router();

function printQueryResult(dbCon,err,result,table,action,query){
   console.log(`table name:${table} /action: ${action}`);
   
   if(err)
    {
        console.log(`${query} query Error: `,err);
        dbCon.rollback(); //트랜잭션 취소
        dbCon.end();
    } 
    else
        console.log(`Result: ${query} query Success`);

    console.log(result);
}

router.get('/list',(req,res)=>{
    console.log("req header좀 보자꾸나", req.headers);
    //console.log("reservation/list,",req.query);
    const dbCon=connectionDB.connectDB();
    const {ground_id, year, month}=req.query;

    const query=`select * from ground_reservation_list where ground_id=${ground_id} and use_date like '${year}-${month}%'`;

    dbCon.query(query, (err,groundTimeList)=>{
        if(err)
            console.log('table name:ground_time_list / Error: select query Error : ',err);
        else
            console.log('table name:ground_time_list / Result: query Success');

        dbCon.end();
        res.json([groundTimeList]);
    });

});


router.post('/',(req,res)=>{
    console.log("정말정말??", req.body);

    if(req.session.account === undefined)
        res.json({result:'not login', message:'로그인 사용자만 이용할 수 있습니다.'});
    
    const ground_id=req.body.ground_id;
    const use_date = `${req.body.year}-${req.body.month}-${req.body.day}`;

    /*****로그인 상태에서 운동장 시간, 날짜 모두 선택하고 예약하기 버튼 눌렀을 경우(예약 진행)******/
    if(req.body.groundTime!==undefined && req.session.account!==undefined){    
        const dbCon=connectionDB.connectDB();
        
        const query = `insert into web_portfolio1.ground_reservation_list(user_id,ground_id,use_date,use_time) 
        values('${req.session.user_id}',${ground_id},'${use_date}','${req.body.groundTime}')`;

        dbCon.query(query, (err,data)=>{ //예약 정보 삽입 쿼리
            printQueryResult(dbCon,err,data,'ground_reservation_list','reservation process','insert');
            console.log(data);
            if(!err){
                res.json({result:'reservationSuccess', message:'예약 성공', error:'none'});
            }
            else{
                dbCon.end();
                res.json({result:'error', message:'예약 실패. 다시 시도해주세요.', error:err});
            }
        });
    }
});




router.delete('/:id',(req,res)=>{
    console.log('delete id: ',req.params.id);
    const id =req.params.id;
    console.log(typeof(id));
    const dbCon=connectionDB.connectDB();

    const query= `delete from ground_reservation_list where id=${id}`;

    dbCon.query(query,(err,result)=>{
        if(err){
            console.log('table name:ground_reservation_list / Error: delete query Error : ',err);
            dbCon.end();
            res.json({result:'error'});
        }
        else{
            console.log('table name:ground_reservation_list / Result: delete query Success');
            console.log(result);
            dbCon.end();
            res.json({result:'success'});
        }
    });
});
//*****예약 승인
router.put('/status/:id',(req,res)=>{
    console.log("update id:",req.params.id);
    const id =req.params.id;
    const dbCon=connectionDB.connectDB();

    const query= `update ground_reservation_list set state='승인 완료' where id=${id}`;

    dbCon.query(query,(err,result)=>{
        if(err){
            console.log('table name:ground_reservation_list / Error: update query Error : ',err);
            dbCon.end();
            res.json({result:'error'});
            
        }
        else{
            console.log('table name:ground_reservation_list / Result: update query Success');
            console.log(result);
            dbCon.end();
            res.json({result:'success'});
        }
    });
});

 module.exports=router;