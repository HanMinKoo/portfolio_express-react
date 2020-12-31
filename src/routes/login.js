import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/login.css';

class Login extends Component{
    
    state={
        loginResultText: '',
        redirect:false
    }

    handleLogin = (loginInfo) => {
        axios({
            method: 'post',
            url: `/login`,
            data:loginInfo,
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.loginResult==="fail")
                this.setState({loginResultText:'아이디 또는 비밀번호를 확인해주세요.'});
            else if(res.data.loginResult==="success")
                window.location.href="/";
        })
        .catch((error)=>{
            console.log('login Error',error);
        });
    }

    handleSubmit = (event)=>{

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
        event.preventDefault();
        this.handleLogin({
            account:event.target.account.value,
            password:event.target.password.value
        });
    }
    render(){
        return(    
            <form className="loginForm" name="login_form" onSubmit={this.handleSubmit}>
                <h1 className="loginHeaderText">로그인</h1>
                <input name="account" type="text" className="loginForm_input" placeholder="아이디" required/> 
                {"\n"}    
                <input name="password" type="password" className="loginForm_input" placeholder="비밀번호" required/>
                
                <div className="loginResultText">{this.state.loginResultText}</div> 

                <input type="submit" value="로그인" className="loginForm_input loginForm_btn"  ></input>
                <strong className="notAccountText">계정이 없으신 경우 <Link to="/join" className="joinLink">회원가입 </Link>을 눌러주세요.</strong>
            </form>
        );
    }
}

export default Login;