import React, {Component} from 'react';
import '../css/join.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Join_component extends Component{
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
 
        if(type==='email')
            element=document.getElementById("userEmail");
        else if(type==='id')
            element=document.getElementById("account");
      
       //alert(element.value);
        if(element.value === ''){ 
           alert(`${type}을 입력해주세요.`);
           return;
        }
   
        const data={
           type:element.type,
           value:element.value
        };
        console.log(data);
        axios({
            method:'post',
            url:'/join/checkduplication',
            data,
        }).then((res)=>{
           
            let radioID;
            let textID;
            let textEmail;
            console.log("중복체크 응답: ",res);

            textID=document.getElementById('duplicateCheckID');
            textEmail=document.getElementById('duplicateCheckEmail');
      
            if(res.data.result==='success'){
            
                alert(`사용 가능한 ${type}입니다.`);
                if(type==='email'){
                    radioID=document.getElementById('duplicationRadioEmail');
                    textEmail.innerHTML='사용가능한 이메일입니다.';
                }
                else if(type==='id'){
                    radioID=document.getElementById('duplicationRadioId');
                    textID.innerHTML='사용가능한 아이디입니다.'
                }
            }
            else{
                alert(`이미 존재하는 ${type}입니다.`);
                if(type==='email')
                    textEmail.innerHTML='이미 존재하는 이메일입니다.';
                else if(type==='id')
                    textID.innerHTML='이미 존재하는 id입니다.'
                
                return; 
            }
            radioID.checked=true;

        }).catch((error)=>{
            console.log('회원가입 중복체크 error: ', error);
        });
   }
   
    handleJoin=(userInfo)=>{
     
        axios({
            method:'post',
            url:'/join/progress',
            data:userInfo
        }).then((res)=>{
           
            if(res.data.result==='success'){  
                this.setState({redirect:true});
            }
            else{
                alert('회원가입 실패');
                console.log('회원가입 실패 에러메시지: ',res.data.message);
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
            
            <div id="join_wrap">
                
                <h1 id="home"><a href="/">M9SOCCER</a></h1>
                <form id="joinForm" name="join_form" onSubmit={this.handleSubmit}>
                    <label>이름</label>
                    <input type="text" name="userName"></input>
                
                    <label>이메일</label>
                    <button type="button" onClick={()=>this.checkDuplication('email')} id="duplicationChk">중복체크</button>
                    <span id="duplicateCheckEmail"></span>
                
                    <input type="email" name="userEmail" id="userEmail" ></input>

                    
                    <label>아이디</label>
                    <button type="button" onClick={()=>this.checkDuplication('id')} id="duplicationChk" >중복체크</button>
                    <span id="duplicateCheckID"></span>
                    
                    <input type="text" name="account" id="account" ></input>
                    <div className="check_font" id="id_check"></div>
            
                    <label>비밀번호</label>
                    
                    <input type="password" name="userPassword1"></input>
                    <label>비밀번호 확인</label>
                    
                    <input type="password" name="userPassword2"></input>
                    <input className="duplicationRadio" type="radio" name="duplicationIdChk" id="duplicationRadioId" value="" ></input>
                    <input className="duplicationRadio" type="radio" name="duplicationEmailChk" id="duplicationRadioEmail"value="" ></input>
                    
                    <button type= "submit" id="joinBtn">가입하기</button> 
                    <br></br>
                    <br></br>
                    <strong><a href="/login" id="login">로그인</a> 하러가기</strong>
                </form>
            </div>
        );
    }
}


// function checkDuplication(type){

//      let element;

//     if(type==='email')
//         element=document.getElementById("userEmail");
//     else if(type==='id')
//         element=document.getElementById("userId");
   
//     //alert(element.value);
//     if(element.value === ''){ 
//         alert(`${type}을 입력해주세요.`);
//         return;
//     }

//     const data={
//         type:element.type,
//         value:element.value
//     };
    
//     $.ajax({
//         url: "/join/checkduplication",
//         type: 'POST',
//         data: data,
//         success: function (data) {
//             let radioID;
//             if(data==='1'){
//                 alert(`사용 가능한 ${type}입니다.`);
//                 if(type==='email')
//                     radioID=document.getElementById('duplicationRadioEmail');
//                 else if(type==='id')
//                     radioID=document.getElementById('duplicationRadioId');
//             }
//             else{
//                 alert(`이미 존재하는 ${type}입니다.`); 
//                 return; 
//             }
                 
//             radioID.checked=true;  
//         },
//         error: function (xhr, status) {
//             alert(xhr + " : " + status);
//         }
//     });
// }

export default Join_component;