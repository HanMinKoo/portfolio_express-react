import React, {Component} from 'react';
import '../css/nav.css';
import  {Link} from "react-router-dom"; //Link를 쓰는 이유는, href로 경로를 바꾸면 페이지가 새로고침 되기 때문이다.
//그래서 a태그를 Link로 바꾸고, href를 to로 바꾼다
//ex) <li><a href='/login'>로그인</a></li> ==><li><Link to='/login'>로그인</Link></li>
import axios from 'axios';
class Nav extends Component{
    state={
        account: '',
      }

      componentDidMount(){;
          this.setState({cnt:this.state.cnt+1});
           axios({
             method:'get',
             url:'/api/getsession'
           })
           .then((res)=>{

             const {account, message} = res.data[0];
             console.log('session call: ',message);
             this.setState({account});

           }).catch((error)=>{
            console.log('session call error: ', error);
           });
      }

    render(){ 
        let navbarAccount;
        if(this.state.account!=='' && this.state.account!=='admin' && this.state.account!==undefined){
            console.log("??");
            navbarAccount=
                <ul className="navbar_account">
                    <li>{this.state.account}</li>
                    <li>로그아웃</li>
                </ul>
        }
        else if(this.state.account==='admin'){
            navbarAccount=
                <ul className="navbar_account">
                    <li>{this.state.account}</li>
                    <li>로그아웃</li>
                    <div className="page"><strong><a href='/adminpage'>관리자 페이지</a></strong></div>
                </ul>
        }
        else{
            navbarAccount=
                <ul className="navbar_account">
                    <li><Link to='/login'>로그인</Link></li>
                    <li id="navbar_account_join"><Link to='/join'>회원가입</Link></li>
                </ul>
        }
               
        return(
            <nav className="navbar">
                <div className="navbar_logo">
                    <i className="fas fa-futbol"></i>
                    <Link to="/">M9SOCCER</Link>
                </div>
                
                <ul className="navbar_menu">
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/reservation">운동장 예약</Link></li>
                    <li><Link to="/test">문의하기</Link></li>
                </ul>
                {navbarAccount}
            </nav>
        );
    }
}
export default Nav;