import React, {Component, useState,useEffect} from 'react';
import '../css/ground.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {fetchGroundImg,fetchGroundInfo} from '../components/fetchGroundData.js';




const initJSX = (groundList,groundImgData) => {

    let jsx = [];
    if(Object.keys(groundList).length!==0){
        //console.log('groundList 이름',this.state.groundList[0].ground_name);
        for(let i=0; i<Object.keys(groundList).length; i++){
            const {main_name, directory_path,extension}=groundImgData.groundImg[i];
            const {name, location, use_time, price}= groundList[i];
            //console.log("name: ", name);
            const imgSrc=`../images/groundImg/${directory_path}/${main_name}.${extension}`;
            const path= `/ground/detail?number=${groundList[i].id}`
        
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

    const [groundList, setGroundList]= useState('');
    const [groundImgData, setGroundImg]=useState('');
    
    useEffect( () =>{
        fetchGroundImg(0,setGroundImg);
        fetchGroundInfo(0,setGroundList);
    },[]);

    let groundListJSX=[];
    
    if(groundList !== '' && groundImgData !== '')
        groundListJSX=initJSX(groundList,groundImgData);
    
    return(
        <article className="groundList_wrap">
            <h1>운동장 리스트</h1>
            {groundListJSX}
        </article> 
    );
}
export default Ground_List;
    
    