import axios from 'axios';
import {Redirect} from 'react-router-dom';

const fetchGroundInfoAndTimeList= async(id,setGroundInfoAndTimeList)=>{
    let path;

    (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    const groundInfo = await fetch(path);
    const groundInfoData = await groundInfo.json();
   
    //console.log('groundInfoData',groundInfoData);
    
    setGroundInfoAndTimeList(groundInfoData);
}

const fetchGroundImg = async(id,setGroundImg)=>{
    const groundImg = await fetch(`/reservation/img/?number=${id}`);
    const groundImgData = await groundImg.json();
    //console.log('체크',groundImgData);
    setGroundImg(groundImgData);
}

const fetchGroundReservationTimeList = async(id, year,month,setReservationData)=>{
    //console.log("아이디 날짜 달",id,year,month);
    const groundReservationList = await fetch(`/reservation/list/?ground_id=${id}&year=${year}&month=${month}`);
    const groundReservationListData = await groundReservationList.json();
    //console.log('운동장 예약시간리스트 fetch완료: ',groundReservationListData); 

    setReservationData(groundReservationListData[0]);
}
const bookReservation = async(year,month,date,ground_time, ground_id)=>{
    axios({
        method:'post',
        url:'/reservation/process',
        data:{
            year,
            month,
            day:date,
            groundTime:ground_time,
            ground_id
        }
    }).then((res)=>{
        //alert("예약이 완료되었습니다.");
        //console.log(res);
        const {result, message, error} = res.data;
        if(error !== 'none')
            (error.code === 'ER_DUP_ENTRY') ?alert('이미 예약된 시간입니다.') : alert("예약 실패. 관리자에게 문의하시기 바랍니다.");
        else{
            alert("예약이 완료되었습니다.");
            window.location.reload();
        }
        
        //console.log('reservationProcess result', result);
        //console.log('reservationProcess message:', message);

      }).catch((error)=>{
        alert("예약 에러!");
       //console.log('reservationProcess error: ', error);
      });
}
export {fetchGroundImg,fetchGroundInfoAndTimeList,fetchGroundReservationTimeList, bookReservation}