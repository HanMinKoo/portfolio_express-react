import React, {useEffect, useState} from 'react';
import axios from 'axios';

function deleteReservation(id){
    const tableBody = document.querySelector('tbody');
    const data={
        id
    };
    axios({
        method:'delete',
        url:'/reservationstate',
        data
    }).then((res)=>{
        const trId = document.getElementById(id);
        tableBody.removeChild(trId);
        alert('삭제되었습니다.');
    });
}

const fetchReservationList = async(setMyReservationList) =>{
    const myReservation = await fetch(`/mypage`);
    const myReservationListData = await myReservation.json();
    
    setMyReservationList(myReservationListData);
}

function initJSX(myReservationList){
    let jsx = [];
    const {account, reservationList} = myReservationList; 
    
    //console.log('mypage data',reservationList);

    for(let i = 0; i<reservationList.length; i++){   
        if(reservationList[0].name === undefined)
            jsx = reservationList[0].text;
        else{
            jsx[i]=
            
                <tr id = {reservationList[i].id} key={reservationList[i].id}>
                    <td>{reservationList[i].id}</td>
                    <td>{reservationList[i].name}</td>
                    <td>{reservationList[i].use_date} &nbsp; {reservationList[i].use_time}</td>
                    <td>{reservationList[i].state}</td>
                    <td><button type='button' onClick={()=>deleteReservation(reservationList[i].id)}>취소</button></td>
                </tr>
            
        
        }
    }
    return [account, jsx];
}

const Mypage = () =>{

    const [myReservationList, setMyReservationList] = useState('');

    let jsx = [];
    if(myReservationList !== '')
        jsx = initJSX(myReservationList);
    

    useEffect(()=>{
        fetchReservationList(setMyReservationList);
    }, []);
    return(
        <div className="mypage_wrap">
            <table>
                <caption>
                    <h3>{jsx[0]}님의 운동장 예약 현황</h3>
                </caption>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>운동장</th>
                        <th>예약 시간</th>
                        <th>예약 상태</th>
                        <th>예약 취소</th>
                    </tr>
                </thead>
                <tbody>
                {jsx[1]}
                </tbody>
            </table>
        </div>
    );
}

export default Mypage;