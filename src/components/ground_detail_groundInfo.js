import React, {useEffect} from 'react';
import '../css/ground_detail_groundInfo.css';


function getImgList(groundImgData){

    const {directory_path,number,extension}=groundImgData;
 
    const imgList = document.querySelector('.groundImgList');
    const mainImg = document.querySelector('.groundMainImg');

    for(let i=0; i<number; i++){
        const imgSrc=`../images/groundImg/${directory_path}/${directory_path}${i+1}.${extension}`;
        const img = document.createElement('img');
        img.src=imgSrc;
        img.className='groundSubImg';
        img.id=i+1;

        img.addEventListener('click',function(){
            mainImg.src=img.src;             
        });
        imgList.appendChild(img);
    }
}

const initGroundInfo = (groundInfoData,groundImgData) =>{
    //console.log('initGroundInfo');
    const {name,use_time,price,location, introduce}=groundInfoData;


    const {main_name,directory_path,extension}=groundImgData.groundImg[0];
    const mainImgPath =`../images/groundImg/${directory_path}/${main_name}.${extension}`;

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
                    <div>
                        <br></br>
                    {introduce}
                    </div>
                </div>
            </ul>
            
            <div className="groundImgList">
               
            
            </div>
        </section>
    return jsx;
} 


const GroundInfo = ({groundInfoData, groundImgData}) =>{
    const groundInfoJSX=initGroundInfo(groundInfoData,groundImgData);

    useEffect(()=>{
        if(groundInfoJSX !== undefined)
            getImgList(groundImgData.groundImg[0]);
    });

    return(   
        <>
            {groundInfoJSX}
        </>  
    );
}

export default GroundInfo;