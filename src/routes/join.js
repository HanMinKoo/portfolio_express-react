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
                    <input type="email" name="userEmail" className="js-userEmail" onKeyUp={()=>pressEmailInput('email')}></input>
                    <span className="js-emailValidationResultSpan validationText"></span>
                    
                    <label>아이디</label>
                    <input type="text" name="account" className="js-account" onKeyUp={()=>pressAccountInput('account')}></input>
                    <span className="js-accountValidationResultSpan validationText"></span>

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
    const accountRegExp = /^[a-zA-Z0-9]{6,12}/i;
    const accountInputValue = document.querySelector('.js-account').value;
    const validationResultSpan = document.querySelector('.js-accountValidationResultSpan');
    const accountValidationRadioBtn = document.querySelector('.js-duplicationCheckRadioAccount');
    const validationNotPassedText = '영문/숫자 조합, 6 ~ 12 글자수로 구성해주세요';

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
        if(regExp.test(input)){
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
    if(result === 'notFound'){
        if(radioBtn.checked === false){ //found에서 notFound, validationFail에서 notFound : false -> true / notFound 반복: 이미 true. 조작 X
            radioBtn.checked = true;
            resultSpan.innerHTML = message;
            //console.log('notFound');
        }      
    }
    else if(result === 'found'){ 
        if(radioBtn.checked === true){ //notfound에서 found: true -> false 
            radioBtn.checked = false;
            //console.log('found');
        }
        else if(radioBtn.checked === false) //validationFild에서 found: false -> false, found에서 found: html만 변경
            {resultSpan.innerHTML = message;
                //console.log('found message change');
            }
    }
    else if('validationFail'){ //NOT FOUND 였다가 유효하지 않으면?: true -> false / 계속 유효하지 않거나, found 상태면?: 계속 false니깐 조작 X
        if(radioBtn.checked === true){
            radioBtn.checked = false;
            //console.log('validationFail')
        }
        if(resultSpan.innerHTML !== text){
            resultSpan.innerHTML = text;
            //console.log("'validationFail message change");
        }
    }  
}

export default Join;