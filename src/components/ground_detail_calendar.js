import React, {useEffect, useState} from 'react';
import '../css/calendar.css';


function makeCalendar(firstDay,lastDate){
    console.log('makeCalendar');
    let dayCnt=0; //1일이 시작하는 요일 계산하기 위해 선언한 변수
    let weekLine=0; //7이 될때 마다 tr생성
    let date=1; //날짜
    let tr;
    //const firstWeek=document.querySelector('.js-firstWeek');

  
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
            td.innerHTML=date;
            tr.appendChild(td);
            date++;
        }
        weekLine++;
    }
}

function initDate(date){
  
    const year=date.getFullYear();
    const month=date.getMonth();
    const firstDay=new Date(year,month,1);
    const lastDay = new Date(year,month+1,0);
    const dateObj={
        year,
        month,
        firstDay:firstDay.getDay(),
        lastDate:lastDay.getDate()
    };

    return dateObj;
}

function Calendar(){
    
    const [date,setDate]= useState(new Date());
    const {year,month,firstDay,lastDate}=initDate(date);
 
    useEffect(()=>{ //return(html이 render)된 후에야 querySelctor 사용 가능
        console.log('2222');
        const tbody=document.querySelector('.js-tbodyDate');
        const tableYear = document.querySelector('.js-tableYear');
        const tableMonth = document.querySelector('.js-tableMonth');
        const nextMonth=document.querySelector('.js-nextMonth');
        nextMonth.addEventListener('click',(event)=>{   
            while(tbody.hasChildNodes()){
                console.log("z:",tbody.firstChild);
                tbody.removeChild(tbody.firstChild);
            }
            console.log("최종 tbody:",tbody.firstChild);
            setDate(new Date(year,month+1));
        });
        tableYear.innerHTML=`${year}년 `;
        tableMonth.innerHTML=`${month+1}월`;

        makeCalendar(firstDay,lastDate);
    });

    return(
        <div className='calendar'>
            <div className="css-calendarHeader">
                <span>◀</span>
                <span className="js-tableYear"></span>
                <span className="js-tableMonth"></span>
                <span className='js-nextMonth'>▶</span>
                
            </div>
            <table>
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
    );
}
  
  export default Calendar;