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

    checkDuplication(type){
        let element;
        (type ==='email') ? element = document.querySelector(".js-userEmail") :
            element = document.querySelector(".js-account");

        if(element.value === ''){ 
           alert(`${type}을 입력해주세요.`);
           return;
        }
   
        /****type: email 또는 id, value: email 또는 id input에 입력된 값****/
        const typeValue={ 
            //type:element.type,
            value:element.value
        };
        axios({
            method:'get',
            url: `/join/duplication/${element.type}-${element.value}`,
            //url:'/join/element.value',
            data:typeValue,
        }).then((res)=>{
            const {result, message} = res.data;

            /****중복 여부 결과 문구 나타내는 span ****/
            const duplicationTextId = document.querySelector('.js-duplicationTextSpanId');
            const duplicationTextEmail = document.querySelector('.js-duplicateTextSpanEmail');

            /****중복체크 했는지 확인하는 input radio  ****/
            const duplicationRadioId = document.querySelector('.js-duplicationCheckRadioId');
            const duplicationRadioEmail = document.querySelector('.js-duplicationCheckRadioEmail');
      
            if(result==='notFound'){
                (type === 'email') ? 
                    this.setDuplicateNotFoundMessage(duplicationTextEmail, message,duplicationRadioEmail) :
                        this.setDuplicateNotFoundMessage(duplicationTextId, message,duplicationRadioId);
            }
            else{
                (type==='email') ? 
                    this.setDuplicateFoundMessage(duplicationTextEmail, message, duplicationRadioEmail) : 
                        this.setDuplicateFoundMessage(duplicationTextId, message, duplicationRadioId);
            }
        }).catch((error)=>{
            alert('중복처리 오류');
            console.log('회원가입 중복체크 error: ', error);
        });
   }
//1. 중복 여부 결과에 따른 텍스트 셋팅 
//2. 매개변수(span태그, 메시지, input radio 태그, input radio ture/false 값, css 클래스명) ****/
   setDuplicateNotFoundMessage(duplicateText, message, duplicateCheckRadio){
       duplicateCheckRadio.checked=true;
       duplicateText.classList.remove('duplicationFound');
       duplicateText.classList.add('duplicationNotFound');
       duplicateText.innerHTML=message;     
   }
   setDuplicateFoundMessage(duplicateText, message, duplicateCheckRadio){
        duplicateCheckRadio.checked=false;
        duplicateText.classList.remove('duplicationNotFound');
        duplicateText.classList.add('duplicationFound');
        duplicateText.innerHTML=message;
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
                    <button type="button" onClick={()=>this.checkDuplication('email')}  >중복체크</button>
                    <span className="js-duplicateTextSpanEmail"></span>
                
                    <input type="email" name="userEmail" className="js-userEmail" onKeyUp={()=>pressEmailInput('email')}></input>
                    <span className="js-emailValidationText validationText"></span>
                    
                    <label>아이디</label>
                    <button type="button" onClick={()=>this.checkDuplication('id')} >중복체크</button>
                    <span className="js-duplicationTextSpanId"></span>
                    
                    <input type="text" name="account" className="js-account" onKeyUp={()=>pressAccountInput('account')}></input>
                    <span className="js-accountValidationText validationText"></span>
                    <div className="check_font" ></div>
            
                    <label>비밀번호</label>
                    
                    <input type="password" name="userPassword1"></input>
                    <label>비밀번호 확인</label>
                    
                    <input type="password" name="userPassword2"></input>
                    <input className="js-duplicationCheckRadioId duplicationRadioId"  type="radio" name="duplicationIdChk" value="" ></input>
                    <input className="js-duplicationCheckRadioEmail duplicationRadioEmail" type="radio" name="duplicationEmailChk" value="" ></input>
                    
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
    const accountInput = document.querySelector('.js-account').value;
    const validationText = document.querySelector('.js-accountValidationText');
    const validationAccountRadioBtn = document.querySelector('.js-duplicationCheckRadioId');

    checkValidation(accountRegExp, accountInput, validationText, validationAccountRadioBtn, 'account');
}

function checkValidation(regExp, input, text, radioBtn, type){
    if(regExp.test(input))
        checkEmailDuplication(input, text, radioBtn,type);
    else{
        text.innerHTML = 'test';
        radioBtn.value= false;
    }
}

function checkEmailDuplication(input, validationResultText, validationRadioBtn, type){
    const value = `${input}-${type}`;
    console.log(value);
    axios({
        method:'get',
        url: `/join/duplication/${value}`,
    })
    .then((res)=>{
        const {result, message} = res.data;
        if(result === 'notFound'){
            validationResultText.innerHTML = message;
            validationRadioBtn.value = true;
        }
        else if(result === 'found'){
            validationResultText.innerHTML = message;
            validationRadioBtn.value = false;
        }
    }).catch((error)=>{
        alert('중복처리 오류');
        console.log('회원가입 중복체크 error: ', error);
    });
}

export default Join;