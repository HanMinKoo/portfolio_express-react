import React, {useEffect} from 'react';
import '../css/ground_detail_timeTable.css'

function fetchReservationList(){
    // const path=`/reservation/getList/?number=${id} && `;

    // (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    // const groundInfo = await fetch(path);
    // const groundInfoData = await groundInfo.json();
   
    // setGroundInfo(groundInfoData);
}


function initTimeTableJSX(timeTable){
  
    const jsx=
    <ul className="timeInput_wrap">
        
        {timeTable.map(time=>{
            console.log(time.ground_time);
            const retunData=
                <li className="timeli">
                    <input type="radio" id={time.ground_time} value={time.ground_time} name="time" className="timeInput"></input>
                    <label for={time.ground_time} className="timeLabel">{time.ground_time}</label>
                </li>
            return retunData;
        })}
        
    </ul>
   
    return jsx;
}

const GroundTimeTable = ({timeTable}) =>{
    let timeTableJSX='';
    if(timeTable !== undefined)
        timeTableJSX=initTimeTableJSX(timeTable);
        
    const alreadyReservationList = fetchReservationList();
    return(
        <>
            <form className="timeTableForm">
                <h2>운동장 이용 가능 시간</h2>
            
                
                {timeTableJSX}
            </form>
            
        <div className="clear"></div>
        <div className="t">
            <div>
                <h3>1회차</h3>
            </div>
        </div>
        </>
        
    );
}

export default GroundTimeTable;