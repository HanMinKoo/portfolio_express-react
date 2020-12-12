import React, {useEffect,useState} from 'react';
import queryString from 'query-string';
import GroundInfo from '../components/ground_detail_groundInfo';
import {fetchGroundImg,fetchGroundInfoAndTimeList} from '../components/fetchGroundData.js';
import Calendar from '../components/ground_detail_calendar';
import { Redirect } from 'react-router-dom';

const Ground_Detail = ({location,match}) => {
  const [groundInfo, setGroundInfoAndTimeList]=useState('');
  const [groundImg, setGroundImg] = useState('');
  //calendar 컴포넌트에서 날짜 선택을 누르면 여기에서 상태 변화.
  //그리고 그 year,month를 groundTimeTable에 넘기고, 거기서 form을 만들어서 클릭누르면 ㄱㄱ서버로 
  //const [yearMonth]
  const query = queryString.parse(location.search);
  const groundId = query.number;

  let jsx='';

  //console.log(`groundInfo:${groundInfo} , groundImg: ${groundImg}`);

  useEffect(()=>{
   
    fetchGroundInfoAndTimeList(groundId,setGroundInfoAndTimeList);
    fetchGroundImg(groundId,setGroundImg);
  },[]);
  if(groundInfo !== '' && groundImg !== '')
  {
    jsx=
    <>
      <GroundInfo groundInfoData={groundInfo.groundList} groundImgData={groundImg}></GroundInfo>
      <Calendar ground_id={groundId} timeTable={groundInfo.groundTimeTable}></Calendar>
    </>
  }
  else if(groundInfo === 'notLogin'){
      alert("로그인 사용자만 이용할 수 있습니다.");
      return <Redirect to='/login' />;
  }

  
  return(
    <>
      {jsx}
    </>
  );
}

export default Ground_Detail;