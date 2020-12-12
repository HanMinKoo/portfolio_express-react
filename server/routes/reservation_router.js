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

    const query=`select * from ground_reservation_list where ground_id=${ground_id} and use_date like '${year}년${month}월%'`;

    dbCon.query(query, (err,groundTimeList)=>{
        if(err)
            console.log('table name:ground_time_list / Error: select query Error : ',err);
        else
            console.log('table name:ground_time_list / Result: query Success');

        //console.log("groundTimeListgroundTimeListgroundTimeList:", groundTimeList);
        res.json([groundTimeList]);
    });

});


router.post('/progress',(req,res)=>{//get방식은 url query에 값을 form의 데이터들을 붙여 보내준다.예약과 관련된 날짜만 넘기는거니 괜찮음.
    console.log("정말정말??", req.body);

    if(req.session.account === undefined)
        res.json({result:'not login', message:'로그인 사용자만 이용할 수 있습니다.'});
    
    //const dbCon=connectionDB.connectDB();

    const ground_id=req.body.ground_id;
    const use_date = `${req.body.year}년${req.body.month}월${req.body.day}일`;

    /*****로그인 상태에서 운동장 시간, 날짜 모두 선택하고 예약하기 버튼 눌렀을 경우(예약 진행)******/
    if(req.body.groundTime!==undefined && req.session.account!==undefined){    
        const dbCon=connectionDB.connectDB();
        
        dbCon.beginTransaction();  //트랜잭션 적용 시작

        const query = `insert into web_portfolio1.ground_reservation_list(user_id,ground_id,use_date,use_time) 
        values('${req.session.user_id}',${ground_id},'${use_date}','${req.body.groundTime}')`;

        dbCon.query(query, (err,data)=>{ //예약 정보 삽입 쿼리
            printQueryResult(dbCon,err,data,'ground_reservation_list','reservation process','insert');
            console.log(data);
            if(!err){
                dbCon.commit(); //트랜잭션 저장
                dbCon.end();
                res.json({result:'reservationSuccess', message:'예약 성공', error:'none'});
            }
            else{
                res.json({result:'error', message:'예약 실패. 다시 시도해주세요.', error:err});
            }
        });
    }
    /*****운동장 시간 체크 but 비로그인 상태, 즉 비정상적 접근 ******/
    // else if(req.query.groundTime!==undefined && req.session.account===undefined)
    //     res.render('exception',{exception:'비정상적 접근입니다. 로그인 후 이용하세요.'}); 
});

 module.exports=router;