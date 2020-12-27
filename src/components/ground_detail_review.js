import '../css/ground_detail_review.css';
import React, {useEffect, useState} from 'react';

function fetchGroundReview(){
    
}

const Review = () =>{
    const [reviewData, setReview]= useState('');
    useEffect(()=>{
        fetchGroundReview(setReview);
    },[]);//나중에 review 입력할 때 마다 불러와야할것같은데.
    return(
        <div className="review_wrap">

            <h1>test</h1>
            <form className="reviewForm">
                <input type="text" maxLength="998" className="inputReviewText"/>
                <button className="reviewButton">등록</button>
            </form>
        </div>
    );
}

export default Review;