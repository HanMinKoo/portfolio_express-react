import React, {Component} from 'react';
import '../css/login.css';


class Login extends Component{
    render(){
        return(    
            <form action="/login/process" method="post" id="loginForm" name="login_form" >
                <h1 >로그인</h1>
                <input name="account" type="text" class="loginForm_input" placeholder="아이디" required/> 
                {"\n"}    
                <input name="password" type="password" class="loginForm_input" placeholder="비밀번호" required/>
                
                <div id="loginResultText"></div> 

                <input type="button" value="로그인" id="loginForm_btn" class="loginForm_input" onClick={examineExceptionLogin} ></input>
            </form>
        );
    }
}

function examineExceptionLogin(){
    const form=document.login_form;
    
    if(form.account.value===''){
        alert("아이디를 입력해주세요.");
        form.account.focus();
        return;
    }
    else if(form.password.value===''){
        alert("비밀번호를 입력해주세요.");
        form.password.focus();
        return;
    }
    form.submit(); 
}

export default Login;