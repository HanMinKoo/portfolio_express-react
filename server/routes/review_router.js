const express = require('express');
const connectionDB= require('../models/connection_DB.js');
const router = express.Router();


router.post('/', (req,res)=>{
    const {reviewText, reservationId} = req.body;

    const dbCon=connectionDB.connectDB();
    dbCon.beginTransaction();  //트랜잭션 적용 시작
    
    const promise = new Promise((solve,reject)=>{
        const query = `insert into web_portfolio1.ground_review(ground_reservation_list_id, text) values(${reservationId},'${reviewText}')`;

        dbCon.query(query, (err,data)=>{
            if(err){
                console.log('table name:ground_review / Error: insert ground_review query Error : ',err);
                reject(err);
            }
            else{
                console.log('table name:ground_review / Result: ground_review insert Success');
                solve();
            }
        });
    });
    promise.then(()=>{
        const query = `update web_portfolio1.ground_reservation_list set review = 'Y' where id=${reservationId}`;
        dbCon.query(query, (err,data)=>{
            if(err){
                console.log('table name:ground_reservation_list / Error: update ground_reservation_list query Error : ',err);
                dbCon.rollback(); //트랜잭션 취소
                res.json({result:'error', message:err});
            }
            else{
                console.log('table name:ground_reservation_list / Result: ground_reservation_list update Success');
                console.log(data);
                dbCon.commit(); //트랜잭션 저장
                res.json({result:'success', message:'예약 성공', status:201});
            }
            dbCon.end();
        });
    })
    .catch(error =>{
        res.json({result:'error', message:error});
        dbCon.end();
    });
});

router.get('/:groundId', (req, res)=>{
    const dbCon=connectionDB.connectDB();
    const groundId = req.params.groundId;
    console.log('testsetsetset',groundId);
    const query = `select user.account, ground_review.text, ground_reservation_list.use_date, ground_reservation_list.use_time from ground_reservation_list 
        INNER JOIN ground_review ON ground_reservation_list.id = ground_review.ground_reservation_list_id 
            INNER JOIN user ON ground_reservation_list.user_id = user.id where ground_reservation_list.ground_id =${groundId}`;  
        
        //LEFT JOIN user ON ground_reservation_list.user_id = user.id where ground_reservation_list.ground_id =${groundId}`;

    dbCon.query(query, (err,data)=>{
        if(err){
            console.log('query :ground review get / Error: ',err);
            res.json({result:'error', message:err});
        }
        else{
            console.log('query :ground review get / Result: query :ground review select Success');
            console.log(data);
            res.json({result:'success', message:data, status:200});
        }
        dbCon.end();
    });

});


module.exports=router;