import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/mypage.css';

function deleteReservation(id){
    const tableBody = document.querySelector('tbody');

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

    const {account, reservationList} = myReservationList; 
    
    
    
    for(let i = 0; i<reservationList.length; i++){
        const {id,name,use_date,use_time,state, review} = reservationList[i];

        let compareDateResult;
        if(reservationList[0].name !== undefined)//즉, 예약 현황이 1개라도 존재하면
            compareDateResult = compareToCurrentAndReservationDate(reservationList[i].use_date.split('-'));

        console.log('mypage data',reservationList[i]);
        if(name === undefined) //여기서 name은 운동장 이름. 즉, 예약 현황이 없으면
            jsx = reservationList[0].text;
        else if(compareDateResult && review !== 'N'){ 
            
            jsx[i]=
            <tr id = {id} key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{use_date} &nbsp; {use_time}</td>
                    <td>{state}</td>
                    <td>취소 불가</td>
                    <td className ="reviewCompletion">리뷰 작성 완료</td>
            </tr>
        }
        else if(compareDateResult){ //쿼리스트링으로 account를 넘겨준다치자. 그런데 어차피 서버쪽에서 account에 해당하는 pk값 찾아와야해. 그러면 그냥 account 안넘기고, db에서 use_date랑 use time 값이 똑같은 id 값 가져오면 될것같은데
            jsx[i]=
                <tr id = {id} key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{use_date} &nbsp; {use_time}</td>
                    <td>{state}</td>
                    <td>취소 불가</td>
                    <td><Link to={`/review?reservationid=${id}`}><button type='button' >리뷰 작성</button></Link></td>
                </tr>
        }
        
        else{
            jsx[i]=
            
                <tr id = {id} key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{use_date} &nbsp; {use_time}</td>
                    <td>{state}</td>
                    <td><button type='button' onClick={()=>deleteReservation(id)}>취소</button></td>
                    <td className ="notReviewCompletion">리뷰 작성 불가</td>
                </tr>
        }
    }
    return [account, jsx];
}
function compareToCurrentAndReservationDate(date){
    const [year,month,day] = date;
    
    const currentDate = new Date();
    const reservationDate = new Date(year, month-1, day); //Date(년도, 월-1, 일)

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
                        <th>리뷰 작성</th>
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