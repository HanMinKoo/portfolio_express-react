import '../css/ground_detail_review.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
function fetchGroundReview(ground_id){
    axios({
        method: 'get',
        url: `/ground/review/${ground_id}`,   //댓글 추가할 때는 /ground/review/uri들쓰기.  (rest api의 uri에는 동사 표현이 들어가면ㅇ ㅏㄴ된다)
    }).then((res)=>{
        //setInquire(true);
    }).catch( error => console.log('inquire error', error));
}

const Review = (ground_id) =>{
    const [reviewData, setReview]= useState('');
    useEffect(()=>{
        fetchGroundReview(ground_id);
    },[]);//나중에 review 입력할 때 마다 불러와야할것같은데.
    return(
        <div className="review_wrap">

            <h1>test</h1>
            <form  className="reviewForm">
                <input type="text" maxLength="998" className="inputReviewText"/>
                <button className="reviewButton">등록</button>
            </form>
        </div>
    );
}

export default Review;