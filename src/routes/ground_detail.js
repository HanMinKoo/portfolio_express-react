import React, {useEffect,useState} from 'react';
import queryString from 'query-string';
import GroundInfo from '../components/ground_detail_groundInfo';
import {fetchGroundImg,fetchGroundInfo} from '../components/fetchGroundData.js';
import Calendar from '../components/ground_detail_calendar';

const Ground_Detail = ({location,match}) => {
  const [groundInfo, setGroundInfo]=useState('');
  const [groundImg, setGroundImg] = useState('');
  const query = queryString.parse(location.search);
  const id = query.number;

  console.log(`groundInfo:${groundInfo} , groundImg: ${groundImg}`);
  useEffect(()=>{
    fetchGroundInfo(id,setGroundInfo);
    fetchGroundImg(id,setGroundImg);
  },[]);

  return(
    <>
      <GroundInfo groundInfoData={groundInfo} groundImgData={groundImg}></GroundInfo>
      <Calendar></Calendar>
    </>
  );
}

export default Ground_Detail;