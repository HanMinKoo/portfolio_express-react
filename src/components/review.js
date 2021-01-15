import React, {useRef} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../css/review.css';

function submitReview(reviewText, reservationId){
    const data = {
        reviewText,
        reservationId
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

function checkReview(event,reviewRef, reservationId){
    event.preventDefault();
    const reviewTextInput = reviewRef.current.value;
    const reviewAlertText = '리뷰를 입력해주세요.'; 

    if(reviewTextInput === '')
        alert(reviewAlertText);
    else
        submitReview(reviewTextInput, reservationId)
}

const Review = ({location}) =>{
    const {reservationid} = queryString.parse(location.search);
    const reviewTextRef = useRef();
    console.log(reservationid);
    return(
        <div className = "review_wrap">
            <form className="review_form" onSubmit={(e)=>checkReview(e,reviewTextRef,reservationid)}>
                <label htmlFor="reviewTextLabel" className="reviewTextLabel">리뷰 작성</label>
                <input type="text" maxLength="300" className="reviewTextInput" placeholder="300자 이하의 리뷰를 남겨주세요." ref={reviewTextRef}/>
                <button type="submit" className="reviewButton">작성</button>
            </form>
        </div>
    );  
}

export default Review;