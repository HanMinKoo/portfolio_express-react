import React, {useEffect, useState} from 'react';
import '../css/ground_detail_calendar.css';
import {fetchGroundReservationTimeList, bookReservation} from './fetchGroundData.js';

function makeUnBookable(ul){
    const li=document.createElement('li');
    li.classList.add('unbookable');
    li.innerHTML = '예약 불가';
    ul.appendChild(li);
}

function makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable,ground_id){

    //console.log('makeCalendar');
    let dayCnt=0; //1일이 시작하는 요일 계산하기 위해 선언한 변수
    let weekLine=0; //7이 될때 마다 tr생성
    let date=1; //날짜
    let tr;

    const currentDate= new Date();

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
            
            const loopDate =new Date(year, month-1, date);
            
            
            //1. 현재 날짜보다 이전의 날짜는 예약 불가 처리(예약 완료로 표시)/
            //이상하게 currentDate > loopDate가 년,월,일 시간 까지 같아도 currentDate가 더 크다고 처리된다. 그래서 현재 날짜도 예약 불가 되서
            //조건문으로 현재 날짜랑 반복문의 날짜가 같으면 예약 가능하다고 처리.
            if(currentDate > loopDate &&
                !(currentDate.getFullYear() === year && currentDate.getMonth()+1 === month && currentDate.getDate() === date)){
                makeUnBookable(ul);
            }
                
            else{
                //1.해당 달의 모든 예약 현황 중 현재 날짜(date)에 맞는 예약 현황만 따로 배열로 만들기
                const dateReservationList= reservationData.filter(reservation => 
                    reservation.use_date === `${year}-${month}-${date}`);    
                
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
                                const groundId = ground_id;
                                bookReservation(year, month, td.id, tableTime.ground_time, groundId);
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

    const dateObj={
        year,
        month,
        firstDay:firstDay.getDay(), //달의 시작요일 번호(일요일0, 월요일 1, 화요일2)
        lastDate:lastDay.getDate() //달이 끝나는 날짜
    };

    return dateObj;
}


//현실 날짜 보다 이전 날짜면 지난 달의 예약 현황을 불러오기 위한 api 요청을 할 필요가 없다.
//어차피 예약 불가가 출력되니깐 바로 달력을 그려주기만 하면된다.
//만약 현실 날짜 기준 이전 날짜가 아니면, false를 반환해준다. 
//즉, 이 함수의 역할은 현실 보다 이전 날짜는 setDate를 업데이트를 안시켜서 예약 현황 데이터 불러오기 위한 api 요청 안하게 하는것.
function checkPreviousYearMonth(year,month,currentYear,currentMonth){
    const tmpDate = new Date(year,month);
    const  changeDate= initDate(tmpDate);
    console.log('변경 날짜',changeDate);

    if(currentYear > changeDate.year || (currentYear>= changeDate.year && currentMonth>changeDate.month)){
        makeCalendar(year,month,changeDate.firstDay,changeDate.lastDate,0,0,0);
        changeCalendarHeader(changeDate.year,changeDate.month);
        return true;
    }
    else   
        return false;

}



function changeYearMonth(year,month,setDate){
    const previousMonth=document.querySelector('.js-previousMonth');
    const nextMonth=document.querySelector('.js-nextMonth');
    const currentYear = year;
    const currentMonth = month;
    
    previousMonth.addEventListener('click',()=>{ // 이전 달 클릭시 서버에 요청 안하고 바로 make calendar 그려버리기
        const tbody=document.querySelector('.js-tbodyDate');

        while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild);
        }
        month -= 2;
        
        // 현실 날짜가 2021년 4월1일이면, 2020년인지, 2021년 1,2,3월인지, 즉 이미 이전의 날인지 체크
        //만약 2021년 6월로 이동한 상태에서 다시 2021년 5월로 이동하면, 현실 날짜 기준 이전 날짜가 아니니깐 
        //setDate가 업데이트 되서 api 요청이 될 것이다.
        //이전 달이면 달력 그린 후, month 증가시키기.
        (checkPreviousYearMonth(year,month,currentYear,currentMonth))
            ? month++ : setDate(new Date(year,month++));

    });

    nextMonth.addEventListener('click',()=>{   
        const tbody=document.querySelector('.js-tbodyDate');

        while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild);
        }

        //다음 달 클릭 버튼에서 이 설정을 해준 이유는
        //현재 날짜가 2021 년4월 1일인데, 2021년 2월 달력으로 이동했다 치자.
        //그 후, 2021년 3월로 이동을 했다 친다. 그러면 이 조건이 설정 되어 있지 않으면
        //예약 현황을 불러오기 위해 api 요청을 하게된다.(setDate 업데이트 된 후, fetch 진행)
        //그래서 이 조건문을 통해 다음 달 클릭을 했어도 현재 날짜 보다 이전의 년 월이면 api 요청 x
        (checkPreviousYearMonth(year,month,currentYear,currentMonth))
            ? month++ : setDate(new Date(year,month++));

    });
}

function Calendar({ground_id, timeTable}){ //컴포넌트가 마운트 되면 모든 useEffect가 실행된다([date], [reservation] 포함)
     
    const [date,setDate]= useState(new Date());
    const [reservationData, setReservationData]=useState(null);
    
    const {year,month,firstDay,lastDate}=initDate(date);

                                        
    useEffect(()=>{
        changeYearMonth(year,month,setDate);
    },[]);
    
    //fetchGroundReservationTimeList 달력의 날짜 바꿀 때 마다 실행시켜야됨
    useEffect(()=>{
        //맨 처음 마운트 되고 모든useEffect가 실행된다. 동시에 reservationData 의 useEffect 까지 실행 되니 달력이 2번그려지게된다(reservationData를 두번 호출한꼴이됨). 그러니깐 reservationData !== null처리해서 처음 실행되는거막기.
        fetchGroundReservationTimeList(ground_id,date.getFullYear(),date.getMonth()+1,setReservationData);

    },[date]);
    useEffect(()=>{
        if(reservationData !== null){
            makeCalendar(year,month,firstDay,lastDate,reservationData,timeTable,ground_id);
            changeCalendarHeader(year,month);
        }
    },[reservationData]);

    return(
        <div className="ground_calendar_wrap">
            
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
    );
}
  
  export default Calendar;