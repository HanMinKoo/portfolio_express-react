import React, {createElement, useEffect,useState} from 'react';
import queryString from 'query-string';
import GroundInfo from '../components/ground_detail_groundInfo';
import {fetchGroundImg,fetchGroundInfoAndTimeList} from '../components/fetchGroundData.js';
import Calendar from '../components/ground_detail_calendar';
import { Redirect } from 'react-router-dom';


const initMenu =  () =>{
  const menuList = document.querySelector('.menuList');
  //const calendar = document.querySelector('.calendar');
  //const review = document.querySelector('.review');
  const menuComponent = document.querySelector('.menuComponent');
  
  const menuLi = menuList.childNodes;
  const menuComponentChildren = menuComponent.childNodes;
  console.log(menuComponentChildren[0])


  // //메뉴 눌렀을 때, 누른 거만 visible 처리하고, 나머지는 none처리할 거임.
  // //이렇게 만든 이유는 만약 메뉴가 100개라고 가정하고 이벤트를하나씩 설정해주면 400줄이 추가되니깐 비효율적이다.
  // //그래서 반복문으로 만듬. o(n^2 처럼 보이지만 실제로 이벤트 눌렀을 때만 반복문 실행되니 o(n)임.)
  //클로저 때문에 해당 i 값이 잘 기억되고있다~
  for(let i=0; i<menuLi.length; i++){
    menuLi[i].addEventListener('click', () => {
      for(let j=0; j<menuLi.length; j++){
        (i === j) ? menuComponentChildren[j].classList.add('visible') : menuComponentChildren[j].classList.remove('visible');
        console.log("i, j",i,j)
      }
    });
  }
  // console.log(ulChildren[0]);

   
}

const Ground_Detail = ({location,match}) => {
  const [groundInfo, setGroundInfoAndTimeList]=useState('');
  const [groundImg, setGroundImg] = useState('');

  const query = queryString.parse(location.search);
  const groundId = query.number;

  let jsx=null;

  useEffect(()=>{
   
    fetchGroundInfoAndTimeList(groundId,setGroundInfoAndTimeList);
    fetchGroundImg(groundId,setGroundImg);
  },[]);

  useEffect(()=>{
    if(jsx !== null)
      initMenu();
  });
  if(groundInfo !== '' && groundImg !== '')
  {
    
    jsx=
    <>
      <GroundInfo groundInfoData={groundInfo.groundList} groundImgData={groundImg}></GroundInfo>
      
      
      <div className="menu">
        <ul className='menuList'>
          <li>예약</li>
          <li>사용 후기</li>
        </ul>
        <div className="menuComponent">

        
          <div className = 'calendar'>
            <Calendar ground_id={groundId} timeTable={groundInfo.groundTimeTable}></Calendar>
          </div>
          <div className = "review">
            <h1>teststestestteststestestteststestestteststestestteststestest</h1>
          </div>
        </div>
      </div>
    </>
    //const choiceMenu = initMenu();
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