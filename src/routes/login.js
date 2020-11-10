import axios from 'axios';
import React, {Component} from 'react';
import '../css/login.css';
import { Redirect } from 'react-router-dom';


class Login extends Component{
    state={
        loginResultText: '',
        redirect:false
    }

    handleLogin = (loginInfo) => {
        axios({
            method: 'post',
            url: '/login/process',
            data:loginInfo,
            withCredentials:true
        })
        .then((res)=>{
            console.log("진짜?",res);
            if(res.data.loginResult==="fail")
                this.setState({loginResultText:'아이디 또는 비밀번호를 확인해주세요.'});
            else if(res.data.loginResult==="success")
            {
                this.setState({redirect:true});
            }
        })
        .catch((error)=>{
            console.log(error);
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
        if(this.state.redirect)
            return <Redirect to='/' test="zzzz"/>;
        return(    
            <form id="loginForm" name="login_form" onSubmit={this.handleSubmit}>
                <h1 >로그인</h1>
                <input name="account" type="text" className="loginForm_input" placeholder="아이디" required/> 
                {"\n"}    
                <input name="password" type="password" className="loginForm_input" placeholder="비밀번호" required/>
                
                <div id="loginResultText">{this.state.loginResultText}</div> 

                <input type="submit" value="로그인" id="loginForm_btn" className="loginForm_input"  ></input>
            </form>
        );
    }
}

export default Login;