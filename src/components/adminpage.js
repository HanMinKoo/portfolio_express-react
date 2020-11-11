import React, {useEffect, useState} from 'react';
import '../css/adminpage.css';
import axios from 'axios';

function updateReservationState(changeState,id,currentState){
    if(currentState==='승인 완료'){ //혹시모를 예외처리
        alert('이미 승인 처리된 예약입니다.');
        return;
    }
    const data={
        state:changeState,
        id
    };
    axios({
        method:'post',
        url:'/reservationstate',
        data: data
    }).then((res)=>{
         
    });


}


const fetchReservationList = async(setReservationData) =>{
    const reservationList = await fetch(`/adminpage`);
    const reservationListData = await reservationList.json();
    console.log('adminpage data',reservationListData);
    setReservationData(reservationListData);
}

 function initJSX(reservationData){
    
    let jsx=[];

    for(let i = 0; i<reservationData.length; i++){
        if(reservationData[i].state === '승인 완료')
        {
            jsx[i]=
            <tr>
            <td>{reservationData[i].id}</td>
            <td>{reservationData[i].account}</td>
            <td>{reservationData[i].name}</td>
            <td>{reservationData[i].use_date} &nbsp; {reservationData[0].use_time} </td>
            <td>{reservationData[i].state}</td>
            <button type="button" className="cancelBtn" onClick={()=>updateReservationState('cancel', reservationData[i].id)}>취소</button>
            </tr>;
        }
        else{
            jsx[i]=
            <tr>
            <td>{reservationData[i].id}</td>
            <td>{reservationData[i].account}</td>
            <td>{reservationData[i].name}</td>
            <td>{reservationData[i].use_date} &nbsp; {reservationData[0].use_time} </td>
            <td>{reservationData[i].state}</td>
            <button type="button" className="approvalBtn" onClick={()=>updateReservationState('approval',reservationData[i].id, reservationData[i].state)}>승인</button>
            <button type="button" className="cancelBtn" onClick={()=>updateReservationState('cancel', reservationData[i].id)}>취소</button>
            </tr>;
        }
    }
    return jsx;
}


const AdminPage = () =>{
    const [reservationData, setReservationData] = useState('');
    let tbodyJSX;
    
    if(reservationData !== ''){
        console.log("test");
        tbodyJSX=initJSX(reservationData.reservationList);
    }

    useEffect(()=>{
        fetchReservationList(setReservationData);
    },[]);
   
    return(
        
        <table>
            <caption>
                <h3>운동장 예약 현황</h3>
            </caption>
            <thead>
                <tr>
                    <th>예약 번호</th>
                    <th>사용자 아이디</th>
                    <th>운동장</th>
                    <th>예약 시간</th>
                    <th>예약 상태</th>
                    <th>예약 처리</th>
                </tr>
            </thead>
            <tbody>
                {tbodyJSX}
            </tbody>
        </table>   
    );
}

export default AdminPage;