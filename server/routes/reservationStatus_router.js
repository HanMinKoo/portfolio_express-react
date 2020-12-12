const express = require('express');
const connectionDB= require('../models/connection_DB.js');
const router = express.Router();


//예약 취소
router.delete('/:id',(req,res)=>{
    console.log('delete id: ',req.params.id);
    const id =req.params.id;
    console.log(typeof(id));
    const db=connectionDB.connectDB();

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
//*****예약 승인
router.put('/:id',(req,res)=>{
    console.log("update id:",req.params.id);
    const id =req.params.id;
    const db=connectionDB.connectDB();

    const query= `update ground_reservation_list set state='승인 완료' where id=${id}`;

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