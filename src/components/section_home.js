import React, {Component} from 'react';
import '../css/section_home.css';
class Section extends Component{
    render(){
        return(
            <section className="content_wrap">
                <article id="reservation_wrap">
                    <div id="backImgMain"></div>
                    <div id="reservation_text">
                        <h1>축구를 즐겁게</h1>
                        <h1>예약을 편리하게</h1>
                        <button id="reservationBtn">운동장 예약하기</button>
                    </div>
                </article>
                <article id="comment_wrap">
                    <h2>운동장 후기</h2>
                    <div>
                        <h3>운동장에 대한 후기를 남겨주세요!</h3>
                        <h3>자신이 예약할 운동장 정보를</h3>
                        <h3>후기를 통해 공유하세요!</h3>
                    </div>
                </article>
            </section>
        );
    }
}

export default Section;