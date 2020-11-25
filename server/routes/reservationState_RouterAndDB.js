const express = require('express');
const connectionDB= require('../models/connection_DB.js');
const router = express.Router();



router.delete('/',(req,res)=>{
    console.log(req.body);

    const db=connectionDB.connectDB();
    const {id}=req.body;

    const query= `delete from ground_reservation_list where id=${id}`;

    db.query(query,(err,result)=>{
        if(err){
            console.log('table name:ground_reservation_list / Error: delete query Error : ',err);
            res.json({result:'error'});
        }
        else{
            console.log('table name:ground_reservation_list / Result: delete query Success');
            console.log(result);
            res.json({result:'success'});
        }
    });
});
//*****예약 승인, 취소 Router(state값을 통해 승인 또는 취소 선택)*****/
router.put('/',(req,res)=>{
    console.log(req.body);
    const db=connectionDB.connectDB();

    const state=req.body.state;
    console.log(state);

    
    const query= `update ground_reservation_list set state='승인 완료' where id=${req.body.id}`;

    db.query(query,(err,result)=>{
        if(err){
            console.log('table name:ground_reservation_list / Error: update query Error : ',err);
            res.json({result:'error'});
        }
        else{
            console.log('table name:ground_reservation_list / Result: update query Success');
            console.log(result);
            res.json({result:'success'});
        }
    });
});


module.exports=router;