import React, {Component} from 'react';
import '../css/join.css';
import "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"


class Join extends Component{
    render(){
        return(
            
            <div id="join_wrap">
                <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <h1 id="home"><a href="/">M9SOCCER</a></h1>
                <form action="/join/progress" id="joinForm" name="join_form" method="post">
                    <label>이름</label>
                    <input type="text" name="userName"></input>
                
                    <label>이메일</label>
                    <button type="button" onClick={checkDuplication('email')} id="duplicationChk">중복체크</button>
                
                    <input type="email" name="userEmail" id="userEmail"></input>

                    
                    <label>아이디</label>
                    <button type="button" onClick={checkDuplication('id')} id="duplicationChk">중복체크</button>
                    
                    
                    <input type="text" name="userId" id="userId"></input>
                    <div class="check_font" id="id_check"></div>
            
                    <label>비밀번호</label>
                    
                    <input type="password" name="userPassword1"></input>
                    <label>비밀번호 확인</label>
                    
                    <input type="password" name="userPassword2"></input>
                    <input class="duplicationRadio" type="radio" name="duplicationIdChk" id="duplicationRadioId" value="" ></input>
                    <input class="duplicationRadio" type="radio" name="duplicationEmailChk" id="duplicationRadioEmail"value="" ></input>
                    
                    <button type= "button" id="joinBtn" onClick={examineExceptionJoin}>가입하기</button> 
                    <br></br>
                    <br></br>
                    <strong><a href="/login" id="login">로그인</a> 하러가기</strong>
                </form>
            </div>
        );
    }
}



/******회원가입 예외처리 ******/
function examineExceptionJoin(){
   
    const idRegExp=/^[a-zA-Z0-9]{6,12}/;
    const nameRegExp=/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const passwordRegExp=/^[a-z0-9]{8,20}/;
    const form=document.join_form;
    
    let returnVariable;
    
    if(form.userName.value==='')
        returnVariable=alertException("이름을 입력해주세요.",form.userName);
    else if(form.userPassword1.value==='')
        returnVariable=alertException("비밀번호를 입력해주세요.",form.userPassword1);
    else if(form.userPassword1.value==='')
        returnVariable=alertException("비밀번호 확인을 입력해주세요.",form.userPassword2);
    else if(form.userPassword1.value!==form.userPassword2.value)
        returnVariable=alertException("비밀번호를 일치시켜주세요.",form.userPassword2);
    else if(form.userId.value==='')
        returnVariable=alertException("아이디를 입력해주세요.(6~12글자)",form.userId);
    else if(!form.duplicationIdChk.checked)
        returnVariable=alertException("아이디 중복체크를 진행하세요.",form.userId);
    else if(!form.duplicationEmailChk.checked)
        returnVariable=alertException("이메일 중복체크를 진행하세요.",form.userEmail);
    else if(!(idRegExp.test(form.userId.value)))
        returnVariable=alertException("아이디를 영문+숫자 조합으로 해주세요.(6~12글자)",form.userId);
    else if(!(nameRegExp.test(form.userName.value)))
        returnVariable=alertException("이름은 한글만 가능합니다.",form.userName);
    else if(!(passwordRegExp.test(form.userPassword1.value)))
        returnVariable=alertException("비밀번호를 영문+숫자 조합으로 해주세요(8~20글자).",form.userPassword1);
       
    if(returnVariable===false)
        return;
    
    form.submit(); 
}

function alertException(text, element){
    alert(text);
    element.focus();
    return false;
}

 function checkDuplication(type){
   
     let element;

    if(type==='email')
        element=document.getElementById("userEmail");
    else if(type==='id')
        element=document.getElementById("userId");
   
    //alert(element.value);
    if(element.value === ''){ 
        alert(`${type}을 입력해주세요.`);
        return;
    }

    const data={
        type:element.type,
        value:element.value
    };
    
    $.ajax({
        url: "/join/checkduplication",
        type: 'POST',
        data: data,
        success: function (data) {
            let radioID;
            if(data==='1'){
                alert(`사용 가능한 ${type}입니다.`);
                if(type==='email')
                    radioID=document.getElementById('duplicationRadioEmail');
                else if(type==='id')
                    radioID=document.getElementById('duplicationRadioId');
            }
            else{
                alert(`이미 존재하는 ${type}입니다.`); 
                return; 
            }
                 
            radioID.checked=true;  
        },
        error: function (xhr, status) {
            alert(xhr + " : " + status);
        }
    });
}

export default Join;