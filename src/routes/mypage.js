import React, {useEffect, useState} from 'react';
import axios from 'axios';

function deleteReservation(id){
    const tableBody = document.querySelector('tbody');
    const data={
        id
    };
    axios({
        method:'delete',
        //url:`/reservationstatus/${id}`,
        url:`/reservation/${id}`,
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
    
    
    // const testDate = new Date(2021,1,10); //Date(년도, 월-1, 일)
    // if(currentDate>testDate){
    //     console.log(currentDate,testDate);
    // }

    const {account, reservationList} = myReservationList; 
    
    //console.log('mypage data',reservationList);

    for(let i = 0; i<reservationList.length; i++){
        //const reservationSplitUseDate=reservationList[i].use_date.split('-');

        const compareDateResult = compareToCurrentAndReservationDate(reservationList[i].use_date.split('-'));

        //console.log(reservationSplitUseDate);
        if(reservationList[0].name === undefined)  //여기서  reservationList[0].name 은 운동장 이름
            jsx = reservationList[0].text;
        else if(!compareDateResult){ //일단은 테스트로 ! 박아둠.
            jsx[i]=
                <tr id = {reservationList[i].id} key={reservationList[i].id}>
                    <td>{reservationList[i].id}</td>
                    <td>{reservationList[i].name}</td>
                    <td>{reservationList[i].use_date} &nbsp; {reservationList[i].use_time}</td>
                    <td>{reservationList[i].state}</td>
                    <td><button type='button' onClick={()=>deleteReservation(reservationList[i].id)}>리뷰 작성</button></td>
                </tr>
        }
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
function compareToCurrentAndReservationDate(date){
    const [year,month,day] = date;
    
    const currentDate = new Date();
    const reservationDate = new Date(year, month-1, day); //Date(년도, 월-1, 일)

    //console.log(reservationDate);
    return (currentDate > reservationDate) ? true : false;
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