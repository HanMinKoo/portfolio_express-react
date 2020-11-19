import React, {useRef} from 'react';
import '../css/inquire.css';

const checkInquireForm= function (event,nameInput,phoneNumber, formContent,formCheckBox){
    //alert(event);
    event.preventDefault();
    //alert(nameInput.current.value);
    //a.current.focus();
    //const form = document.inquire_Form;
    //console.log(form);

    if(nameInput.current.value === ''){
        alert('고객명을 입력해주세요.');
        nameInput.current.focus();
        return;
    }
    else if(phoneNumber.current.value === '')
        alert('휴대폰 번호를 입력해주세요.');
        phoneNumber.current.focus(); 
        return;
    }
    // else if(formContent.current.value === ''){

    // }
    // else if(form.content.value===''){
    //     alert('내용을 입력해주세요.');
    //     form.content.focus(); 
    //     return;
    // }
    // else if(!form.infoChk.checked){
    //     alert('개인정보 수집 및 이용 동의를 체크해주세요.');
    //     form.infoChk.focus(); 
    //     return;
    // }
    //form.submit(); 
}

function Inquire(){
    const nameInput = useRef();
    const phoneNumber = useRef();
    const formContent = useRef();
    const formCheckBox = useRef();
    return(
        <div className="inquire_wrap">
            
            <div className="inquireInfoText">
                <h1 >문의하기</h1>
                <strong >운동장 예약관련 문의사항이 있으신 분은 아래의 작성폼을 작성해주시기 바랍니다.</strong>
            </div>
            <form onSubmit={(e)=>checkInquireForm(e, nameInput, phoneNumber, formContent,formCheckBox)} method="post" className="inquireForm" name="inquire_Form">
                <label for="customerName">고객명</label>
                <input type="text" name="userName" id="customerName" className="formCustomerName" maxlength="10" ref={nameInput}/>
                <label for="phonNumber">연락처</label>
                <input type="text" name="phoneNumber" id="phonNumber" className="formPhoneNumber" maxlength="15" ref={phoneNumber}/>
                <label for="formContent">내용</label>
                <input type="text" name="content" id="formContent" className="formContent" maxlength="998" ref={formContent}/>
               
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
                    <input type="checkbox" name="infoChk" className="checkBox" ref={formCheckBox}></input>
                    <span >개인정보 수집 및 이용에 동의합니다.</span>
                    <p className="FormBtn">
                        <input type="submit" value="작성"  name="chk" />
                    </p>
                </div>    
            </form>
        </div>  
    );
}

export default Inquire;