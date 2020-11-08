import React, {useEffect, useState} from 'react';

const fetchReservationList = async(setReservationData) =>{
    const reservationList = await fetch(`/adminpage`);
    const reservationListData = await reservationList.json();
    console.log('adminpage data',reservationListData);
    setReservationData(reservationListData);
}

// function initJSX(reservationData){
//     <tbody>
//      </tbody>

// }


const AdminPage = () =>{
    const [reservationData, setReservationData] = useState('');
    let tbodyJSX;
     if(reservationData !== '')
     //console.log("asdadas",reservationData.reservationList[0]);
         tbodyJSX=initJSX(reservationData.reservationList);
    useEffect(()=>{
        //console.log("asdadas",reservationData.reservationList[0]);
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
        </table>
        
    );
}

export default AdminPage;