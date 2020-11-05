import React, {useEffect,useState} from 'react';
import queryString from 'query-string';
import GroundInfo from '../components/ground_detail_groundInfo';
import {fetchGroundImg,fetchGroundInfo} from '../components/fetchGroundData.js';
import Calendar from '../components/ground_detail_calendar';
import GroundTimeTable from '../components/ground_detail_groundTimeTable';


const Ground_Detail = ({location,match}) => {
  const [groundInfo, setGroundInfo]=useState('');
  const [groundImg, setGroundImg] = useState('');
  //calendar 컴포넌트에서 날짜 선택을 누르면 여기에서 상태 변화.
  //그리고 그 year,month를 groundTimeTable에 넘기고, 거기서 form을 만들어서 클릭누르면 ㄱㄱ서버로 
  //const [yearMonth]
  const query = queryString.parse(location.search);
  const id = query.number;

  console.log(`groundInfo:${groundInfo} , groundImg: ${groundImg}`);
  useEffect(()=>{
    fetchGroundInfo(id,setGroundInfo);
    fetchGroundImg(id,setGroundImg);
  },[]);

  return(
    <>
      <GroundInfo groundInfoData={groundInfo.groundList} groundImgData={groundImg}></GroundInfo>
      <Calendar ></Calendar>
      <GroundTimeTable timeTable={groundInfo.groundTimeTable}></GroundTimeTable>
    </>
  );
}

export default Ground_Detail;