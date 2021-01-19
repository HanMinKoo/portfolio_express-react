import React, {useRef, useState} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../css/review.css';
import { Redirect} from 'react-router-dom';

function submitReview(reviewText, reservationId, setReviewResult){
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
        const {result, message} = res.data;
        if(result === 'success'){
            alert("작성 성공");
            setReviewResult(true);
        }
        else
            alert('작성 실패');
    })
    .catch(error => console.log('review ERROR',error));
}

function checkReview(event,reviewRef, reservationId, setReviewResult){
    event.preventDefault();
    const reviewTextInput = reviewRef.current.value;
    const reviewAlertText = '리뷰를 입력해주세요.'; 

    if(reviewTextInput === '')
        alert(reviewAlertText);
    else
        submitReview(reviewTextInput, reservationId, setReviewResult)
}

const Review = ({location}) =>{
    const [reviewResult, setReviewResult] = useState(false);
    const {reservationid} = queryString.parse(location.search);
    const reviewTextRef = useRef();
    console.log(reservationid);

    if(reviewResult){
        return <Redirect to='/'/>;;
    }
    return(
        <div className = "review_wrap">
            <form className="review_form" onSubmit={(e)=>checkReview(e,reviewTextRef,reservationid, setReviewResult)}>
                <label htmlFor="reviewTextLabel" className="reviewTextLabel">리뷰 작성</label>
                <input type="text" maxLength="300" className="reviewTextInput" placeholder="300자 이하의 리뷰를 남겨주세요." ref={reviewTextRef}/>
                <button type="submit" className="reviewButton">작성</button>
            </form>
        </div>
    );  
}

export default Review;