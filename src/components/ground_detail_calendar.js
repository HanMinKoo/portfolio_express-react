import React, {useEffect, useState} from 'react';
import '../css/ground_detail_calendar.css';
import {fetchGroundReservationTimeList, fetchBookReservation} from './fetchGroundData.js';


function makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable){
    console.log('makeCalendar');
    let dayCnt=0; //1일이 시작하는 요일 계산하기 위해 선언한 변수
    let weekLine=0; //7이 될때 마다 tr생성
    let date=1; //날짜
    let tr;


    const currentDate= new Date();
    console.log(timeTable);
    console.log(reservationData);
    
    const tbody=document.querySelector('.js-tbodyDate');//tr 생성하기 위해서
    
    const forRange=lastDate+(firstDay-dayCnt);//firstDay-dayCnt만큼 반복문을 소모했으니깐, lastDate만큼 반복하기 위해서 더해줘야지
    //firstDay-dayCnt가 달력의 맨 첫줄의 일요일부터 실제 1일이 시작하는 요일까지의 간격. 
    //그리고 그 간격만큼 반복문을 소모한거니깐 lastDate(달의 마지막 일)까지 출력이 부족함.
    //그래서 반복문을 마지막날 + (처음 달력의 일요일 부터 1일이 시작하는 요일까지의 간격, 출력하기위해) 
    
    for(let i=1; i<=forRange; i++){

        //일주마다 tr 생성
        if(weekLine%7===0){
            tr = document.createElement('tr');
            tbody.appendChild(tr);
        }

        const td = document.createElement('td');

        /*****달력의 맨 처음 일요일부터 1일이 시작하는 요일까지 공백 만들기*****/
        if(dayCnt<firstDay){ 
            td.innerHTML = ''; 
            tr.appendChild(td);
            dayCnt++;
        }

        //date추가
        else if(dayCnt===firstDay || date<=lastDate){
            td.id=`${date}`;
            if(date===currentDate.getDate())
                td.className='calendarChoiceDate';
            
        //먼저 해당 년/월의 모든 예약 현황들 중 date에 맞는 예약 현황만 따로 배열로 만들기
            const dateReservationList= reservationData.filter(reservation => 
                reservation.use_date === `${year}년${month}월${date}일`);

            //console.log(dateReservationList);
            const ul=document.createElement('ul');
        
            
            let count=1;
            //현재 운동장의 시간들을 순회하며 운동장 시간과 date(날짜)의 시간에 해당하는 예약 현황이 있으면
            //classList를 추가하여 예약 가능 불가능 나누기   
            timeTable.forEach(tableTime => {
                const li=document.createElement('li');
                const findReservationTime=dateReservationList.find(reservationTime => 
                    reservationTime.use_time === tableTime.ground_time);
            
                if(findReservationTime !== undefined){
                    li.classList.add('unbookable');
                    li.innerHTML = `${count++}부: ${tableTime.ground_time}(예약 완료)`;
                }
                else{
                    li.classList.add('bookable');
                    li.innerHTML = `${count++}부: ${tableTime.ground_time}(예약 가능)`;

                    li.addEventListener('click',function(){
                        const ground_id = reservationData[0].ground_id;
                        
                        fetchBookReservation(year, month, td.id, tableTime.ground_time, ground_id);
                    });
                }
                ul.appendChild(li);
            });

        
            const tdDiv = document.createElement('div');
            
            tdDiv.appendChild(ul);

            const tdDate = document.createElement('strong');
            tdDate.innerHTML=date;
            tdDate.className='date';

            td.appendChild(tdDate);
            td.appendChild(tdDiv);
            
            tr.appendChild(td);
            date++;
        }
        weekLine++;
    }
}
function changeCalendarHeader(year,month){

    const tableYear = document.querySelector('.js-tableYear');
    const tableMonth = document.querySelector('.js-tableMonth');
    tableYear.innerHTML=`${year}년 `;
    tableMonth.innerHTML=`${month}월`;
}

function initDate(date){
   // console.log(date.getDate());
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    
    const firstDay=new Date(year,month-1,1);  
    const lastDay = new Date(year,month,0);  
    console.log("initDatemonth",month);
    console.log("initDatefirstDay",firstDay);
    console.log("initDatelastDate",lastDay);
    const dateObj={
        year,
        month,
        firstDay:firstDay.getDay(), //달의 시작요일 번호(일요일0, 월요일 1, 화요일2)
        lastDate:lastDay.getDate() //달이 끝나는 날짜
    };

    return dateObj;
}

function changeYearMonth(year,month,setDate){
    const previousMonth=document.querySelector('.js-previousMonth');
    const nextMonth=document.querySelector('.js-nextMonth');
    
    previousMonth.addEventListener('click',()=>{
        const tbody=document.querySelector('.js-tbodyDate');

        while(tbody.hasChildNodes()){
            console.log("z:",tbody.firstChild);
            tbody.removeChild(tbody.firstChild);
        }
        console.log("최종 tbody:",tbody.firstChild);

        setDate(new Date(year,--month));

    });

    nextMonth.addEventListener('click',(event)=>{   
        const tbody=document.querySelector('.js-tbodyDate');

        while(tbody.hasChildNodes()){
            console.log("z:",tbody.firstChild);
            tbody.removeChild(tbody.firstChild);
        }
        console.log("최종 tbody:",tbody.firstChild);
        //fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth(),setReservationData);
        setDate(new Date(year,++month));
    });
}

function Calendar({ground_id, timeTable}){
     
    const [date,setDate]= useState(new Date());
    const [reservationData, setReservationData]=useState('');
   
        //const [choiceDate, setChoiceDate]= useState('');
    const {year,month,firstDay,lastDate}=initDate(date);
    console.log("initDateMonth",month);

   

    //fetchGroundReservationTimeList 달력의 날짜 바꿀 때 마다 실행시켜야됨
    useEffect(()=>{
        changeYearMonth(year,month,setDate);
        fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);
    },[]);

    useEffect(()=>{
        if(reservationData !== ''){//reservationData.date와 바뀐 date는 다를꺼란말이야. 그걸 이용해보자.
            const reservationArrayDate = reservationData[0].use_date.split('월');
            const changedDate = `${date.getFullYear()}년${date.getMonth()+1}월`;

            //month를 바꿀 때 마다 예약된 정보를 다시 요청해야한다
            //그런데 기존에 reservationData가 ==='' 아닐때 fetch하게 되면, 기존의 reservationData가 있기 때문에 fetch가안된다 
            //그래서 월을 바꿨을 때 reservationData 데이터의 년월과 바뀐 date의 년 월을 비교해서
            //값이 다르다면 그 때 그 년월에 해당하는 데이터를 fetch하고, 값을 불러와 값이 맞다면 makeCleandar를한다. 
            if(`${reservationArrayDate[0]}월` === changedDate){
                console.log('맞지?');
                makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable);
                changeCalendarHeader(year,month);
            }
            else 
                fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);
        }
            
    },[date,reservationData]);

    return(
        <>
            <ul className="choiceList">
                <li className="choiceReservationInfo">예약</li>
                <li className="choiceGroundInfo">운동장 정보</li>
            </ul>
            <div className="reservation_wrap">
                <div className='calendar'>
                    <div className="calendarHeader">
                        <span className="js-previousMonth">◀</span>
                        <span className="js-tableYear"></span>
                        <span className="js-tableMonth"></span>
                        <span className='js-nextMonth'>▶</span>
                        
                    </div>
                    <table className="calendarTable">
                        <thead>
                            <tr>
                                <th id="0">일</th>
                                <th id="1">월</th>
                                <th id="2">화</th>
                                <th id="3">수</th>
                                <th id="4">목</th>
                                <th id="5">금</th>
                                <th id="6">토</th>
                            </tr>
                        </thead>
                        <tbody className="js-tbodyDate"></tbody> 
                    </table>
                </div>
            </div>
            <div className='clear'></div>
        </>
    );
}
  
  export default Calendar;