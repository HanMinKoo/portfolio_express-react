import React, {Component, useEffect} from 'react';
import '../css/ground_detail.css';


function getImgList(groundImgData){
    const {main_name,directory_path,number,extension}=groundImgData;
    let groundImg =[];
    
    for(let i=0; i<number; i++){
        const imgSrc=`../images/groundImg/${directory_path}/${directory_path}${i+1}.${extension}`;
        groundImg[i]=<img src={imgSrc} className="test" id={i+1}></img>
    }
    return groundImg;
}

const initGroundInfo = (groundInfoData,groundImgData) =>{
    const {name,use_time,price,location, introuduce}=groundInfoData;
    const {main_name,directory_path,extension}=groundImgData.groundImg[0];
    const mainImgPath =`../images/groundImg/${directory_path}/${main_name}.${extension}`;

    //console.log("groundImgData.groundImg",groundImgData.groundImg[0]);
    const groundImgList=getImgList(groundImgData.groundImg[0]);

    const jsx=
        <section className='ground_detail_groundInfo'>
            <img src={mainImgPath} className="groundMainImg"></img>
            <ul className="groundInfo_text">

                <li><h1>{name}</h1></li>
                <li><h3 className="location">{location}</h3></li>
                <li><h3>가격: {price} 만원</h3></li>
                <li><h3>이용 가능 시간: {use_time}</h3></li>

                <div className="groundIntroduceText">
                    <strong>운동장 소개</strong>
                </div>
            </ul>
            
            <div className="groundImgList">
                {groundImgList}
            
            </div>
        </section>
    return jsx;
} 


const GroundInfo = ({groundInfoData, groundImgData}) =>{
    
    let groundInfoJSX;
    
    //두 정보 모두 fetch 완료 됐을 경우만 실행
    if(groundInfoData!=='' && groundImgData!=='')
        groundInfoJSX=initGroundInfo(groundInfoData,groundImgData);

    useEffect(()=>{
        console.log("실행 몇번될까?>",groundInfoJSX);
        if(groundInfoJSX !== undefined)
            changeGroundMainImg();
    });

    
    return(   
        <>
            {groundInfoJSX}
        </>  
    );
}

function changeGroundMainImg(){
    const test = document.querySelectorAll('.test');
    console.log(test[0].currentSrc);
    const mainImg = document.querySelector('.groundMainImg');
    test[1].addEventListener('click',function(){
        console.log('click');
        mainImg.src=test[1].currentSrc;
    });
}

export default GroundInfo;