import React, {Component} from 'react';
import '../css/join.css';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Join extends Component{
    state={
        redirect:false
    }

    alertException(text, element){
        alert(text);
        element.focus();
        return false;
    }

    handleJoin=(userInfo)=>{
     
        axios({
            method:'post',
            url:'/join',
            data:userInfo
        }).then((res)=>{
           
            if(res.data.result==='success'){  
                this.setState({redirect:true});
            }
            else{
                alert('회원가입 실패');
                //console.log('회원가입 실패 에러메시지: ',res.data.message);
            }
           

        }).catch((error)=>{
            console.log('회원가입 error: ', error);
        });

    }
    
    handleSubmit = (event)=>{
        

        event.preventDefault();
        
        
        const idRegExp=/^[a-zA-Z0-9]{6,12}/;
        const nameRegExp=/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const passwordRegExp=/^[a-z0-9]{8,20}/;
        const form=document.join_form;
        
        let returnVariable;
        
        if(form.userName.value==='')
            returnVariable=this.alertException("이름을 입력해주세요.",form.userName);
        else if(form.userPassword1.value==='')
            returnVariable=this.alertException("비밀번호를 입력해주세요.",form.userPassword1);
        else if(form.userPassword1.value==='')
            returnVariable=this.alertException("비밀번호 확인을 입력해주세요.",form.userPassword2);
        else if(form.userPassword1.value!==form.userPassword2.value)
            returnVariable=this.alertException("비밀번호를 일치시켜주세요.",form.userPassword2);
        else if(form.account.value==='')
            returnVariable=this.alertException("아이디를 입력해주세요.(6~12글자)",form.account);
        else if(!form.duplicationIdChk.checked)
            returnVariable=this.alertException("아이디 중복체크를 진행하세요.",form.account);
        else if(!form.duplicationEmailChk.checked)
            returnVariable=this.alertException("이메일 중복체크를 진행하세요.",form.userEmail);
        else if(!(idRegExp.test(form.account.value)))
            returnVariable=this.alertException("아이디를 영문+숫자 조합으로 해주세요.(6~12글자)",form.account);
        else if(!(nameRegExp.test(form.userName.value)))
            returnVariable=this.alertException("이름은 한글만 가능합니다.",form.userName);
        else if(!(passwordRegExp.test(form.userPassword1.value)))
            returnVariable=this.alertException("비밀번호를 영문+숫자 조합으로 해주세요(8~20글자).",form.userPassword1);
        
        if(returnVariable===false)
            return;
        
        this.handleJoin({
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
                
                <h1 className="homeText"><Link to="/">M9SOCCER</Link></h1>
                <form className="joinForm" name="join_form" onSubmit={this.handleSubmit}>
                    <label>이름</label>
                    <input type="text" name="userName"></input>
                
                    <label>이메일</label>
                    <span className="js-duplicateTextSpanEmail"></span>
                
                    <input type="email" name="userEmail" className="js-userEmail" onKeyUp={()=>pressEmailInput('email')}></input>
                    <span className="js-emailValidationText validationText"></span>
                    
                    <label>아이디</label>
                    <span className="js-duplicationTextSpanId"></span>
                    
                    <input type="text" name="account" className="js-account" onKeyUp={()=>pressAccountInput('account')}></input>
                    <span className="js-accountValidationResultText validationText"></span>

                    <label>비밀번호</label>
                    <input type="password" name="userPassword1"></input>

                    <label>비밀번호 확인</label>
                    <input type="password" name="userPassword2"></input>

                    <input className="js-duplicationCheckRadioAccount duplicationRadioBtn"  type="radio" name="duplicationIdChk" value="" ></input>
                    <input className="js-duplicationCheckRadioEmail duplicationRadioBtn" type="radio" name="duplicationEmailChk" value="" ></input>
                    
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
    const eamilInput = document.querySelector('.js-userEmail').value;
    const validationText = document.querySelector('.js-emailValidationText');
    const validationEmailRadioBtn = document.querySelector('.js-duplicationCheckRadioEmail');

    checkValidation(emailRegExp, eamilInput, validationText, validationEmailRadioBtn, 'email');
}

function pressAccountInput(){
    const accountRegExp = /^[a-zA-Z0-9]{6,12}/i;
    const accountInputValue = document.querySelector('.js-account').value;
    const validationResult = document.querySelector('.js-accountValidationResultText');
    const accountValidationRadioBtn = document.querySelector('.js-duplicationCheckRadioAccount');
    const validationNotPassedText = '유효한 데이터만 입력하세요';

    checkValidation(accountRegExp, accountInputValue, validationResult, accountValidationRadioBtn, 'account')
    .then((resultBoolean)=>{
        if(resultBoolean){ //dom 조작 함수 호출하기

        }
        else{

        }
    });
    // if(!(checkValidation(accountRegExp, accountInputValue, validationResult, accountValidationRadioBtn, 'account'))){//유효성 검사 통과 못하면
    // //undefined가 ! 만나면 true가 됨
    //     if(validationResult.innerHTML !== validationNotPassedText) //이미 저 글씨인데 계속 입력하면 dom 조작 빈번히 일어남. 
    //         validationResult.innerHTML = validationNotPassedText;

        
    //     validationResult.classList.add('validationNotPassed');
    //     validationResult.classList.remove('validationPassed');
    // }
    // else{
    //     validationResult.classList.remove('validationNotPassed');
    //     validationResult.classList.add('validationPassed');
    // }
}

function checkValidation(regExp, input, text, radioBtn, type){
    return new Promise((solve, reject)=>{   //비동기 처리니깐 true를 반환할 수가 없음. then된 곳에서 return true하면 그 then의 콜백에 true가 반횐되는거니깐..
        //그래서 Promise를 만듬. Promise를 안만들고 then에서 dom 조작하는 함수를 만들어 호출할 수 있지만, 유효성을 검사하는 함수에서 조작하기에는 어울린것 같지 않음.
        if(regExp.test(input)){

            checkEmailDuplication(input, type)
            .then((res)=>{
                const {result, message} = res.data;
                text.innerHTML = message;
                (result === 'notFound') ? radioBtn.checked = true : radioBtn.checked = false;
                solve(true);
            })
            .catch(error => {
                alert('중복처리 오류');
                console.log('회원가입 중복체크 error: ', error);
            });
        }
        else{
            radioBtn.checked= false;
            solve(false);
        }
    });
    
}

function checkEmailDuplication(input, type){
    const value = `${input}-${type}`;

    return new Promise((solve, reject) => {
        axios({
            method:'get',
            url: `/join/duplication/${value}`,
        })
        .then((res)=>{
            solve(res);
        })
        .catch((error)=>{
            reject(error);
        });

    });
}

//dom 조작 함수 만들기

export default Join;