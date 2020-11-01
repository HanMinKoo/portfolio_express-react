import React, {useState} from 'react';

const fetchGroundInfo= async(id,setGroundInfo)=>{
    let path;

    (id===0) ? path='/reservation' :path=`/reservation/?number=${id}`;
    const groundInfo = await fetch(path);
    const groundInfoData = await groundInfo.json();
    
    setGroundInfo(groundInfoData.groundList);
}

const fetchGroundImg = async(id,setGroundImg)=>{
    const groundImg = await fetch(`/reservation/img/?number=${id}`);
    const groundImgData = await groundImg.json();
    console.log('체크',groundImgData);
    setGroundImg(groundImgData);
}

export {fetchGroundImg,fetchGroundInfo}