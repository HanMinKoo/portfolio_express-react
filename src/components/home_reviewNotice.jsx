import React from 'react';
import '../css/home.css';
import bgImage_home from '../images/home_reviewNoticeImage.jpg';
import  {Link} from "react-router-dom";




function home_reservationNotice(){
    return(
        <article className="reviewNotice_wrap">
            <img className="reviewImage" src={bgImage_home}/>
            <ul className="reviewText">
                <h1> 운동장 후기</h1>
                <li><h3>운동장 후기를 작성하여</h3></li>
                <li><h3>사람들과 운동장 정보를 공유해보세요!</h3></li>
                <li><h3>운동장 이용에 도움될거에요!</h3></li>
                <li><Link to='/ground/detail?number=1'><button  type="button" className="reviewMoveBtn"><h1>운동장 후기 작성하기</h1></button></Link></li>
            </ul>
        </article>
    );
}

export default home_reservationNotice;