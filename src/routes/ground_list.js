import React, {useState,useEffect} from 'react';
import '../css/ground.css';

import {Link} from 'react-router-dom';
import {fetchGroundImg,fetchGroundInfoAndTimeList} from '../components/fetchGroundData.js';


const initJSX = (groundListData,groundImgData) => {

    let jsx = [];

    if(groundListData.groundList.length!==0){ 
        for(let i=0; i<groundListData.groundList.length; i++){
   
            const {main_name, directory_path,extension}=groundImgData.groundImg[i];
            const {name, location, use_time, price}= groundListData.groundList[i];

            const imgSrc=`../images/groundImg/${directory_path}/${main_name}.${extension}`;
            const path= `/ground/detail?number=${groundListData.groundList[i].id}`
        
            jsx[i]=

                <div className="groundList_content">
                    <Link to={path}>
                        <img className="groundImg" src={imgSrc}/>
                        <ul className="groundInfo_NameLocation">
                            <li><h2>{name}</h2></li>
                            <li className="groundInfo"><h3>{location} </h3></li>
                        </ul>
                        <ul className="groundInfo_TimePrice">
                            <li className="groundInfo"><h3>{use_time} </h3></li>
                            <li className="groundInfo"><h3>{price} 만원</h3></li> 
                        </ul>
                    </Link>
                </div>
        }
    }
    
    return jsx;
}

const Ground_List = () =>{
    
    const [groundListData, setGroundList]= useState('');
    const [groundImgData, setGroundImg]=useState('');
    console.log(groundListData);
    useEffect( () =>{

        fetchGroundImg(0,setGroundImg);
        fetchGroundInfoAndTimeList(0,setGroundList);
    },[]);

    let groundListJSX=[];
    
    if(groundListData !== '' && groundImgData !== '')  
        groundListJSX=initJSX(groundListData,groundImgData);
    
    
    return(
        <article className="groundList_wrap">
            <h1>운동장 리스트</h1>
            {groundListJSX}
        </article> 
    );
}
export default Ground_List;
    
    