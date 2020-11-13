import React, {Component, useState} from 'react';
import '../css/inquire.css';

function Inquire(){
    return(
        <div className="inquire_wrap">
            
            <div className="inquireInfoText">
                <h1 >문의하기</h1>
                <strong >운동장 예약관련 문의사항이 있으신 분은 아래의 작성폼을 작성해주시기 바랍니다.</strong>
            </div>
            <form action="/inquire" method="post" className="inquireForm" name="inquire_Form">
                <label for="customerName">고객명</label>
                <input type="text" name="userName" id="customerName" className="formCustomerName" maxlength="10"/>
                <label for="phonNumber">연락처</label>
                <input type="text" name="phoneNumber" id="phonNumber" className="formPhoneNumber" maxlength="15"/>
                <label for="formContent">내용</label>
                <input type="text" name="content" id="formContent" className="formContent" maxlength="998" />
               
                <div className="inquireFormPrivacy">
                    <h2>개인정보 수집 및 이용동의에 대한 안내</h2>
                    <strong>필요 수집, 이용 항목(문의 접수와 처리, 회신을 위한 최소한의 개인정보 동의가 필요합니다.)</strong>

                
                    <table className="inquireFormPrivacyTable">
                        <thead>
                            <tr>
                                <th>수집항목</th>
                                <th>목적</th>
                                <th>보유기간</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>휴대폰 번호</td>
                            <td>고객 문의 및 상담 요청에 대한 회신</td>
                            <td>문의 접수 후 1년 보관</td>
                        </tr>
                    </table>
                    <p className="detailTextPrivacy">
                        <span>자세한 내용은  
                            <a href="">개인정보처리방침을</a>
                            참고하시기 바랍니다.
                        </span>
                    </p>
                    <input type="checkbox" name="infoChk" className="checkBox"></input>
                    <span >개인정보 수집 및 이용에 동의합니다.</span>
                    <p className="FormBtn">
                        <input type="button" value="작성" onClick="inquire_Form_Chk();" name="chk" />
                    </p>
                </div>    
            </form>
        </div>
        
    );

}

export default Inquire;