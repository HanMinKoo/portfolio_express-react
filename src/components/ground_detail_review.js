import '../css/ground_detail_review.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function initJSX(data){
    let jsx = [];
    if(data.length ===0 ){
        jsx.push('등록된 리뷰가 없습니다.');
        return jsx;
    }
        
    for(let i=0; i<data.length; i++){
        
        const {account, text, use_date, use_time} = data[i];
        console.log(account,text,use_date);
    
        jsx[i] =
            <ul className="reviewInfo_wrap">
                <li className="account">사용자명: {account}</li>
                <li className="useDate">이용 날짜: {use_date} {use_time}</li>
                <li className="text">{text}</li>
            </ul>
    }
    return jsx;
}

function fetchGroundReview(groundIdObj, callback){
    const groundId = groundIdObj.ground_id;
    console.log('ddd',groundId);
    axios({
        method: 'get',
        url: `/review/${groundId}`,   //댓글 추가할 때는 /ground/review/uri들쓰기.  (rest api의 uri에는 동사 표현이 들어가면ㅇ ㅏㄴ된다)
    }).then((res)=>{
        //console.log(res);
        console.log(res.data.message);
        callback(res.data.message);
    }).catch( error => console.log( error));
}

const Review = (ground_id) =>{
    const [reviewData, setReview]= useState('');
    useEffect(()=>{
        fetchGroundReview(ground_id, setReview);
    },[]);
    let tbodyJSX='';
    if(reviewData !== ''){
        tbodyJSX = initJSX(reviewData);
    }
    return(
        <div className="ground_reviewComponent_wrap">
            {tbodyJSX}
        </div>
    );
}

export default Review;