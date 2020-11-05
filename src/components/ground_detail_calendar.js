import React, {useEffect, useState} from 'react';
import '../css/ground_detail_calendar.css';

function fetchDate(year,month,choiceDate){
    console.log("fetchData", year, month, choiceDate);
    // (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    // const groundInfo = await fetch(path);
    // const groundInfoData = await groundInfo.json();
}

function makeCalendar(firstDay,lastDate,setChoiceDate){
    console.log('makeCalendar');
    let dayCnt=0; //1일이 시작하는 요일 계산하기 위해 선언한 변수
    let weekLine=0; //7이 될때 마다 tr생성
    let date=1; //날짜
    let tr;
    //const firstWeek=document.querySelector('.js-firstWeek');
    //console.log("firstday",firstDay);
    const currentDate= new Date();
    let choiceDate;
    //console.log(currentDate.getDate());
    
    
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
            if(date===currentDate.getDate()){
                td.className='calendarChoiceDate';
                //td.classList.re
                choiceDate=td;
                console.log('choiceDate',choiceDate);
            }
            
            td.addEventListener('click',()=>{
                choiceDate.classList.remove('calendarChoiceDate');//기존의 choiceData의 class 삭제해주고.
                td.className='calendarChoiceDate'; //선택한 날짜에 className 부여하여 선택표시
                choiceDate=td;//그리고 현재 td를 선택한 choiceDate로..
                console.log('td.id',td.id);
                setChoiceDate(td.id);
            });

            // td.appendChild=
            // <div>
            //     <strong>{date}</strong>
            //     <h1>test</h1>
            // </div>
            td.innerHTML=date;
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
    tableMonth.innerHTML=`${month+1}월`;
}

function initDate(date){
   // console.log(date.getDate());
    const year=date.getFullYear();
    const month=date.getMonth();
    const firstDay=new Date(year,month,1);  
    const lastDay = new Date(year,month+1,0);  
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

        setDate(new Date(year,++month));
    });
}
//function Calendar({groundInfoData, groundImgData}){
function Calendar(){    
    const [date,setDate]= useState(new Date());
    const [choiceDate, setChoiceDate]= useState('');
    const {year,month,firstDay,lastDate}=initDate(date);

    useEffect(()=>{
        changeYearMonth(year,month,setDate);
        // makeCalendar(firstDay,lastDate,setChoiceDate);
        // changeCalendarHeader(year,month);
    },[]);

    useEffect(()=>{ //return(html이 render)된 후에야 querySelctor 사용 가능
        // console.log('groundImgData',groundImgData);
        // console.log('groundInfoData',groundInfoData);
        //if(groundInfoData!=='' && groundImgData!==''){
            console.log("123123123");
            makeCalendar(firstDay,lastDate,setChoiceDate);
            changeCalendarHeader(year,month);
        //}
    },[date]);

    return(
        <>
            <ul className="choiceList">
                <li>예약</li>
                <li>운동장 정보</li>
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
                <button onClick={()=>fetchDate(year,month,choiceDate)} className="calendarChoiceCompleteBtn"><h3>선택 완료</h3></button>

                
            </div>
        </div>
        </>
    );
}
  
  export default Calendar;