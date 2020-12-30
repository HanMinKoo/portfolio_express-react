import React, {useEffect,useState} from 'react';
import queryString from 'query-string';
import GroundInfo from '../components/ground_detail_groundInfo';
import {fetchGroundImg,fetchGroundInfoAndTimeList} from '../components/fetchGroundData.js';
import Calendar from '../components/ground_detail_calendar';
import Review from '../components/ground_detail_review';
import { Redirect } from 'react-router-dom';
import '../css/ground_detail.css';

const initMenu =  () =>{
  const menuList = document.querySelector('.js-menuList');
  const menuComponent = document.querySelector('.js-menuComponent');
  
  const menuLi = menuList.childNodes;
  const menuComponentChildren = menuComponent.childNodes;
  console.log(menuComponentChildren[0]);


  // //메뉴 눌렀을 때, 누른 거만 visible 처리하고, 나머지는 none처리할 거임.
  // //이렇게 만든 이유는 만약 메뉴가 100개라고 가정하고 이벤트를하나씩 설정해주면 400줄이 추가되니깐 비효율적이다.
  // //그래서 반복문으로 만듬. o(n^2 처럼 보이지만 실제로 이벤트 눌렀을 때만 반복문 실행되니 o(n)임.)
  //클로저 때문에 해당 i 값이 잘 기억되고있다~
  for(let i=0; i<menuLi.length; i++){
    menuLi[i].addEventListener('click', () => {
      for(let j=0; j<menuLi.length; j++){
        if(i === j ){
          menuComponentChildren[j].classList.remove('unVisible'); //unvisible 효과 삭제')
          menuLi[j].classList.add('select'); //메뉴 선택표시(밑에 검은색 border)
        }
        else{
          menuComponentChildren[j].classList.add('unVisible');
          menuLi[j].classList.remove('select');
        }
        (i === j) ? menuComponentChildren[j].classList.remove('unVisible') : menuComponentChildren[j].classList.add('unVisible');
        console.log("i, j",i,j)
      }
    });
  }
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
        <ul className='js-menuList menuList'>
          <li className='select'>예약</li>
          <li>사용 후기</li>
        </ul>
        <div className="js-menuComponent menuComponent">
          <div className = 'calendarComponent ' >
            <Calendar ground_id={groundId} timeTable={groundInfo.groundTimeTable}></Calendar>
          </div>
          <div className = "reviewComponent unVisible">
            <Review ground_id={groundId}></Review>
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