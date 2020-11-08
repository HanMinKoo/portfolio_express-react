import axios from 'axios';
const fetchGroundInfoAndTimeList= async(id,setGroundInfoAndTimeList)=>{
    let path;

    (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    const groundInfo = await fetch(path);
    const groundInfoData = await groundInfo.json();
   
    setGroundInfoAndTimeList(groundInfoData);
}

const fetchGroundImg = async(id,setGroundImg)=>{
    const groundImg = await fetch(`/reservation/img/?number=${id}`);
    const groundImgData = await groundImg.json();
    console.log('체크',groundImgData);
    setGroundImg(groundImgData);
}

const fetchGroundReservationTimeList = async(id, year,month,setReservationData)=>{
    
    const groundReservationList = await fetch(`/reservation/list/?ground_id=${id}&year=${year}&month=${month}`);
    const groundReservationListData = await groundReservationList.json();
    console.log('운동장 예약시간리스트 fetch완료: ',groundReservationListData); 
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
        console.log(res);
        const {result, message} = res.data;
        console.log('reservationProcess result', result);
        console.log('reservationProcess message:', message);
        // this.setState({account});

      }).catch((error)=>{
       console.log('reservationProcess error: ', error);
      });
}
export {fetchGroundImg,fetchGroundInfoAndTimeList,fetchGroundReservationTimeList, bookReservation}