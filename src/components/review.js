import React, {useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../css/review.css';

function submitReview(reviewText, groundId, useDate, useTime){
    const data = {
        reviewText,
        groundId,
        useDate,
        useTime
    };
    axios({
        method: 'post',
        url: '/review',
        data
    })
    .then((res)=>{
        console.log(res);
    })
    .catch(error => console.log('review ERROR',error));
}

function checkReview(event,review, groundId, useDate, useTime){
    event.preventDefault();
    const reviewTextInput = review.current.value;
    const reviewAlertText = '리뷰를 입력해주세요.'; 

    if(reviewTextInput === '')
        alert(reviewAlertText);
    else
        submitReview(reviewTextInput, groundId, useDate, useTime)
}

const Review = ({location}) =>{
    const {groundid, usedate, usetime} = queryString.parse(location.search);
    const reviewTextRef = useRef();
    //console.log(groundid, usedate, usetime);
    return(
        <div className = "review_wrap">
            <form className="review_form" onSubmit={(e)=>checkReview(e,reviewTextRef,groundid,usedate,usetime)}>
                <label htmlFor="reviewTextLabel" className="reviewTextLabel">리뷰 작성</label>
                <input type="text" maxLength="300" className="reviewTextInput" placeholder="300자 이하의 리뷰를 남겨주세요." ref={reviewTextRef}/>
                <button type="submit" className="reviewButton">작성</button>
            </form>
        </div>
    );  
}

export default Review;