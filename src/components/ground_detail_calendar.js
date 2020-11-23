import React, {useEffect, useState} from 'react';
import '../css/ground_detail_calendar.css';
import {fetchGroundReservationTimeList, bookReservation} from './fetchGroundData.js';




function makeUnBookable(timeTable, ul, count){
    //timeTable.forEach(tableTime => {
        const li=document.createElement('li');
        li.classList.add('unbookable');
        li.innerHTML = '예약 불가';
        //li.innerHTML = `${count++}부: ${tableTime.ground_time}(예약 완료)`;
        ul.appendChild(li);
    //});
}

//예약, 운동장 정보 등 메뉴 선택이벤트 활성화
function initChoiceInfoMenu(){
    const reservationInfo = document.querySelector('.js-choiceReservationInfo');
    const groundInfo = document.querySelector('.js-choiceGroundInfo');

    reservationInfo.addEventListener('click', function(){
        groundInfo.classList.remove('choiceInfo');
        reservationInfo.classList.add('choiceInfo');
    });
    groundInfo.addEventListener('click', function(){
        //bookReservation(2020, 11, 27, '10:00 ~ 12:00', 1);
        reservationInfo.classList.remove('choiceInfo');
        groundInfo.classList.add('choiceInfo');
    });
}


function makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable){
    console.log('makeCalendar');
    let dayCnt=0; //1일이 시작하는 요일 계산하기 위해 선언한 변수
    let weekLine=0; //7이 될때 마다 tr생성
    let date=1; //날짜
    let tr;


    const currentDate= new Date();
    //console.log('currentDate',currentDate.getDate());
    //console.log(timeTable);
    //console.log(reservationData);
    
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

            const ul=document.createElement('ul');

            if(date === currentDate.getDate())
                td.className='calendarChoiceDate';


            let count=1;
            
            //****현재 날짜보다 이전의 날짜는 모두 예약 못하게 막기.(예약 완료로 표시)  ****/
            //1. 지난 달, 또는 지난 년도이거나 또는
            //2. 일자가 현재 일자보다 이전이면서, 이번년, 이번달인 경우
            if((currentDate.getFullYear() >= year && currentDate.getMonth()+1 > month) ||
            (date < currentDate.getDate()) && (currentDate.getFullYear() === year && currentDate.getMonth()+1 === month)){
                makeUnBookable(timeTable, ul, count);
            }

            else{
                //1.해당 달의 모든 예약 현황 중 현재 날짜(date)에 맞는 예약 현황만 따로 배열로 만들기
                const dateReservationList= reservationData.filter(reservation => 
                    reservation.use_date === `${year}년${month}월${date}일`);      
                
                //2. forEach를 통해 현재 운동장의 이용 시간대를 순회.
                //3. 현재 날짜의 운동장 예약 현황(dateReservationList)에 순회하는 시간대가 존재하면(find 메소드)
                //classList의 값을 unbookable, 존재하지 않으면 bookable을 추가하여 예약 가능 불가능 적용
                //4.classList의 값이 bookable일 경우 클릭 이벤트를 설정하여 예약 진행 함수 호출(bookReservation)
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
                            const reservationConfirm = window.confirm('예약을 진행하시겠습니까?');

                            if(reservationConfirm){
                                const ground_id = reservationData[0].ground_id;
                                bookReservation(year, month, td.id, tableTime.ground_time, ground_id);
                            }
                            else
                                alert("예약 노노");
                        });
                    }
                    ul.appendChild(li);
                });
            }

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
    //console.log("initDatemonth",month);
    //console.log("initDatefirstDay",firstDay);
    //console.log("initDatelastDate",lastDay);
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
        console.log('이전달 클릭');
        while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild);
        }
        month -= 2;
        console.log('이전달 month -2', month);
        setDate(new Date(year,month++));
        console.log('이전달 month ++', month);
    });

    nextMonth.addEventListener('click',(event)=>{   
        const tbody=document.querySelector('.js-tbodyDate');
        console.log('이후달 클릭');
        while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild);
        }
        console.log('다음달 month ', month);
        setDate(new Date(year,month++));
        console.log('다음달 month++ ', month);
    });
}

function Calendar({ground_id, timeTable}){
     
    const [date,setDate]= useState(new Date());
    const [reservationData, setReservationData]=useState(null);
    
    const {year,month,firstDay,lastDate}=initDate(date);
    console.log(year,month,firstDay,lastDate)
    //console.log('지금', new Date(20,0)); //1920년 1월 
    //console.log("initDateMonth",month);  
                                            
    //fetchGroundReservationTimeList 달력의 날짜 바꿀 때 마다 실행시켜야됨
    useEffect(()=>{
        changeYearMonth(year,month,setDate);
        initChoiceInfoMenu();
        fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);
    },[]);

    // useEffect(()=>{
    //     if(reservationData !== null){
    //         // if(reservationData.length === 0){
    //         //     console.log('reservationData.length',reservationData.length);
    //         //     reservationData.use_date = null;
    //         //     makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable);
    //         //     changeCalendarHeader(year,month);
    //         // }
    //         // else{
    //             console.log('dddddddddddddddddd',reservationData[0]);
    //             //console.log('dddddddddddddddddd',reservationData[0].use_date);
    //             if(reservationData[0] === undefined){
    //                 //console.log('dddddddddddddddddd',reservationData[0]);
    //             }
    //             //console.log('reservationData.length 0아님',reservationData[0].use_date);
    //             const reservationArrayDate = reservationData[0].use_date.split('월');
    //             const changedDate = `${date.getFullYear()}년${date.getMonth()+1}월`;

    //             //month를 바꿀 때 마다 예약된 정보를 다시 요청해야한다
    //             //그런데 기존에 reservationData가 !=='' 때 fetch하게 되면, 기존의 reservationData가 있기 때문에 fetch가안된다 
    //             //그래서 월을 바꿨을 때 reservationData 데이터의 년월과 바뀐 date의 년 월을 비교해서
    //             //값이 다르다면 그 때 그 년월에 해당하는 데이터를 fetch하고, 값을 불러와 값이 맞다면 makeCleandar를한다. 
    //             if(`${reservationArrayDate[0]}월` === changedDate){
    //                 console.log('맞지?');
    //                 makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable);
    //                 changeCalendarHeader(year,month);
    //             }
    //             else 
    //                 fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);
    //         //}
    //     }
            
    // },[date,reservationData]);

    useEffect(()=>{
        //맨 처음 마운트 되고 모든useEffect가 실행되는데, 동시에 reservationData 의 useEffect 까지 실행 되니 달력이 2번그려지게된다(reservationData를 두번 호출한꼴이됨). 그러니깐 reservationData !== null처리해서 처음 실행되는거막기.
        if(reservationData !== null){
            fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);
        }
    },[date]);
    useEffect(()=>{
        if(reservationData !== null){
            makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable);
            changeCalendarHeader(year,month);
        }
    },[reservationData]);

    return(
        <>
            <ul className="choiceList">
                <li className="js-choiceReservationInfo">예약</li>
                <li className="js-choiceGroundInfo">운동장 정보</li>
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