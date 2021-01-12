import React, {Component} from 'react';
import '../css/join.css';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Join extends Component{
    state={
        redirect:false
    }

    progressJoin=(userInfo)=>{
        axios({
            method:'post',
            url:'/join',
            data:userInfo
        }).then((res)=>{
            (res.data.result==='success') ? this.setState({redirect:true}) : alert('회원가입 실패');
        }).catch((error)=>{
            console.log('회원가입 error: ', error);
        });
    }
    
    handleSubmit = (event)=>{
        event.preventDefault();
        const result = checkFormLastValidation();

        if(result === false)
            return;
        
        this.progressJoin({
            userName: event.target.userName.value,
            account:event.target.account.value,
            userEmail:event.target.userEmail.value,
            userPassword1:event.target.userPassword1.value
        });

    }
    render(){
        if(this.state.redirect)
            return <Redirect to='/'/>;
        return(
 
            <div className="join_wrap">
                
                <h1 className="homeText"><Link to="/">MK GROUND</Link></h1>
                <form className="joinForm" name="join_form" onSubmit={this.handleSubmit}>
                    <label>이름</label>
                    <input type="text" name="userName"></input>
                
                    <label>이메일</label>         
                    <input type="email" name="userEmail" className="js-userEmail" onKeyUp={()=>pressEmailInput()}></input>
                    <span className="js-emailValidationResultSpan validationText"></span>
                    
                    <label>아이디</label>
                    <input type="text" name="account" className="js-account" onKeyUp={()=>pressAccountInput()}></input>
                    <span className="js-accountValidationResultSpan validationText"></span>

                    <label>비밀번호</label>
                    <input type="password" name="userPassword1" classList="js-password1" onKeyUp={()=>pressPasswordInput()}></input>
                    <span className="js-passwordValidationResultSpan validationText"></span>

                    <label>비밀번호 확인</label>
                    <input type="password" name="userPassword2" classList="js-password2" onKeyUp={checkPasswordSame}></input>
                    <span className="js-passwordSameCheckSpan validationText"></span>

                    <input className="js-duplicationCheckRadioAccount duplicationRadioBtn"  type="radio" name="duplicationIdChk" value="" ></input>
                    <input className="js-duplicationCheckRadioEmail duplicationRadioBtn" type="radio" name="duplicationEmailChk" value="" ></input>
                    <input className='js-passwordSameRadio passwordSameRadioBtn' type="radio" name="passwordSameChk" value="" ></input>
                    <button type= "submit" className="joinBtn">가입하기</button> 
                    <br></br>
                    <br></br>
                    <strong><Link to="/login" className="login">로그인</Link> 하러가기</strong>
                </form>

            </div>
        );
    }
}


function pressEmailInput(){
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const eamilInputValue = document.querySelector('.js-userEmail').value;
    const validationResultSpan = document.querySelector('.js-emailValidationResultSpan');
    const validationEmailRadioBtn = document.querySelector('.js-duplicationCheckRadioEmail');
    const validationNotPassedText = '유효한 이메일을 작성해주세요.';

    checkValidation(emailRegExp, eamilInputValue, 'email')
    .then((res)=>{
        if(res === 'validationFail'){
            res = {data:{result:res, message:''}};
        }   
        printValidationResult(validationNotPassedText, validationResultSpan, validationEmailRadioBtn, res); 
    });
}

function pressAccountInput(){
   
    const accountRegExp = /^[A-Za-z0-9+]{6,12}$/;
    const accountInputValue = document.querySelector('.js-account').value;
    const validationResultSpan = document.querySelector('.js-accountValidationResultSpan');
    const accountValidationRadioBtn = document.querySelector('.js-duplicationCheckRadioAccount');
    const validationNotPassedText = '영문 혹은 영문/숫자 조합, 6 ~ 12 글자수로 구성해주세요';

    checkValidation(accountRegExp, accountInputValue, 'account')
    .then((res)=>{
        if(res === 'validationFail'){
            res = {data:{result:res, message:''}};
        }   
        printValidationResult(validationNotPassedText, validationResultSpan, accountValidationRadioBtn, res); 
    });
}

/*유효성 검사 및 중복 체크*/
function checkValidation(regExp, input,type){
    return new Promise((solve, reject)=>{ 

        if(regExp.test(input)){ //유효성 검사가 true면 중복 체크
            //input 값 중복 체크 API 요청(함수로 만드는게 코드 가독성이 좋을지 모르겠지만, 쓸데없이 길어짐...)
            const value = `${input}-${type}`;
            axios({
                method:'get',
                url: `/join/duplication/${value}`,
            })
            .then((res)=>{
                solve(res); //then된 곳에서 return true하면 그 then의 콜백에 true가 반횐됨. 그래서 Promise 이용
            })
            .catch((error)=>{
                reject(error);
            });
        }
        else{
            solve('validationFail');
        }
    });
    
}

function printValidationResult(text, resultSpan, radioBtn, res){

    const {result, message} = res.data;
 
    //dom 조작 최소하 하기위해 조건문 설정, 
    if(result === 'notFound'){//possible
        if(radioBtn.checked === false){ //found에서 notFound, validationFail에서 notFound : false -> true / notFound 반복: 이미 true. 조작 X
            radioBtn.checked = true;
            resultSpan.innerHTML = message;
            resultSpan.classList.add('validationPassed');
            resultSpan.classList.remove('validationNotPassed');
            //console.log('notFound');
        }      
    }
    else if(result === 'found'){ //impossible
        if(radioBtn.checked === true){ //notfound에서 found: true -> false 
            console.log('2',message);
            radioBtn.checked = false;
            resultSpan.innerHTML = message;
            resultSpan.classList.add('validationNotPassed');
            resultSpan.classList.remove('validationPassed');
            //console.log('found');
        }
        else if(radioBtn.checked === false) //validationFild에서 found: false -> false, found에서 found: html만 변경
        {
            console.log('1',message);
            resultSpan.innerHTML = message;
            resultSpan.classList.add('validationNotPassed');
            //console.log('found message change');
        }
    }
    else if('validationFail'){ //NOT FOUND 였다가 유효하지 않으면?: true -> false / 계속 유효하지 않거나, found 상태면?: 계속 false니깐 조작 X
        if(radioBtn.checked === true){
            radioBtn.checked = false;
            resultSpan.classList.add('validationNotPassed');
            resultSpan.classList.remove('validationPassed');
            //console.log('validationFail')
        }
        if(resultSpan.innerHTML !== text){
            resultSpan.innerHTML = text;
            resultSpan.classList.add('validationNotPassed');
            resultSpan.classList.remove('validationPassed');
            //console.log("'validationFail message change");
        }
    }  
}

function pressPasswordInput(){
    
    const passwordRegExp = /^[a-z0-9A-Z]{8,20}/;
    const passwordInputValue = document.join_form.userPassword1.value;
    const passwordValue2 = document.join_form.userPassword2.value;
    const validationResultSpan = document.querySelector('.js-passwordValidationResultSpan');
    const validationPassedText = '사용 가능한 비밀번호 입니다.';
    const validationNotPassedText = '유효한 비밀번호를 입력하세요.(영문 대소문자 숫자조합(8~20글자))';
    const passwordCheckRadioBtn = document.querySelector('.js-passwordSameRadio');
    const password2ResultSpan = document.querySelector('.js-passwordSameCheckSpan');

    if(passwordRegExp.test(passwordInputValue)){
        if(validationResultSpan.innerHTML !== validationPassedText){
            validationResultSpan.innerHTML = validationPassedText;
            validationResultSpan.classList.add('validationPassed');
            validationResultSpan.classList.remove('validationNotPassed');
        }
    }
    else{
        if(validationResultSpan.innerHTML !== validationNotPassedText){
            validationResultSpan.innerHTML = validationNotPassedText;
            validationResultSpan.classList.add('validationNotPassed');
            validationResultSpan.classList.remove('validationPassed');
        }
    }
    if(passwordInputValue !== passwordValue2){
        if(passwordCheckRadioBtn.checked){ //비밀번호가 다른데 체크가 된 경우, 처음에 비밀번호 일치 시켰다가 첫번째 비밀번호 변경하면 이렇게됨.
            passwordCheckRadioBtn.checked = false;
            password2ResultSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
            password2ResultSpan.classList.add('validationNotPassed');
            password2ResultSpan.classList.remove('validationPassed');
        }
    }

}

function checkPasswordSame(){
    const password1 = document.join_form.userPassword1.value;
    const password2 = document.join_form.userPassword2.value;
    const passwordResultSpan = document.querySelector('.js-passwordSameCheckSpan');
    const resultText = '비밀번호가 일치하지 않습니다.';
    const passwordCheckRadioBtn = document.querySelector('.js-passwordSameRadio');

    if(password1 !== password2){
        if(passwordResultSpan.innerHTML !== resultText ){ //이 조건문을 안걸면 비밀번호 일치하지 않을 때 마다 돔 조작 됨.
            passwordResultSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
            passwordResultSpan.classList.add('validationNotPassed');
            passwordResultSpan.classList.remove('validationPassed');
            passwordCheckRadioBtn.checked = false;
        }
    }
    else{
        const passwordRegExp = /^[a-z0-9A-Z]{8,20}/;
        if(passwordRegExp.test(password1)){ //첫번째 비밀번호가 유효성 검사 통과도 못하면 일치해봤자임.
            passwordResultSpan.innerHTML = '비밀번호가 일치합니다.'
            passwordResultSpan.classList.add('validationPassed');
            passwordResultSpan.classList.remove('validationNotPassed');
            passwordCheckRadioBtn.checked = true;

        }
        else
            passwordResultSpan.innerHTML = '유효한 비밀번호를 입력하세요.(영문 대소문자 숫자조합(8~20글자))';
    }
}

function checkFormLastValidation(){
    const nameRegExp=/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const form=document.join_form;

    let result;
        
    if(form.userName.value==='')
        result=alertException("이름을 입력해주세요.",form.userName);
    else if(!form.passwordSameChk.checked)
        result=alertException("비밀번호를 확인하세요",form.userPassword1);
    else if(form.account.value==='')
        result=alertException("아이디를 입력해주세요.(6~12글자)",form.account);
    else if(!form.duplicationIdChk.checked)
        result=alertException("아이디를 확인하세요.",form.account);
    else if(!form.duplicationEmailChk.checked)
        result=alertException("이메일을 확인하세요.",form.userEmail);
    else if(!(nameRegExp.test(form.userName.value)))
        result=alertException("이름은 한글만 가능합니다.",form.userName);
    
    return result; 
}

function alertException(text, element){
    alert(text);
    element.focus();
    return false;
}

export default Join;