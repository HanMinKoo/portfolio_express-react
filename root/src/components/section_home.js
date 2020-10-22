import React, {Component} from 'react';
import '../css/section_home.css';
class Section extends Component{
    render(){
        return(
            <section className="content_wrap">
                <article id="reservation_wrap">
                    <div id="backImgMain"></div>
                    <div id="textMain">
                        <h1>축구를 즐겁게</h1>
                        <h1>예약을 편리하게</h1>
                        <button id="reservationBtn">운동장 예약하기</button>
                    </div>
                </article>
                <article id="comment_wrap">
                    <h2>운동장 후기</h2>
                    <p>
                        <h4>운동장에 대한 후기를 남겨주세요!</h4>
                        <h4>자신이 예약할 운동장 정보를</h4>
                        <h4>후기를 통해 공유하세요!</h4>
                    </p>
                </article>
                
            </section>
        );
    }
}

export default Section;