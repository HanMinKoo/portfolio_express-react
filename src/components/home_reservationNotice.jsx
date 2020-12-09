import React from 'react';
import '../css/home.css';
import bgImage_home1 from '../images/home_reservationNoticeImage.jpg'
import  {Link} from "react-router-dom";


function home_reservationNotice(){
    return(
        <article className="reservationNotice_wrap">
            <img className="reservationImage" src={bgImage_home1}/>
           
            <ul className="reservation_text">
                <li><h1>축구를 즐겁게</h1></li>
                <li><h1>예약을 편리하게</h1></li>
                <h1><Link to='/ground' className="reservationMoveBtn">운동장 예약하기</Link></h1>  
            </ul>  
            
    
        </article>
    );

}

export default home_reservationNotice;