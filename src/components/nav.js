import React, {Component} from 'react';
import '../css/nav.css';
import  {Link} from "react-router-dom"; //Link를 쓰는 이유는, href로 경로를 바꾸면 페이지가 새로고침 되기 때문이다.
//그래서 a태그를 Link로 바꾸고, href를 to로 바꾼다
//ex) <li><a href='/login'>로그인</a></li> ==><li><Link to='/login'>로그인</Link></li>

class Nav extends Component{
    render(){
        console.log(this.props.account);
        let navbarAccount;
        if(this.props.account!=='' && this.props.account!=='admin' && this.props.account!==undefined){
            navbarAccount=
                <ul className="navbar_account">
                    <li>{this.props.account}</li>
                    <li>로그아웃</li>
                </ul>
        }
        else if(this.props.account==='admin'){
            navbarAccount=
                <ul className="navbar_account">
                    <li>{this.props.account}</li>
                    <li>로그아웃</li>
                    <div className="page"><strong><a href='/adminpage'>관리자 페이지</a></strong></div>
                </ul>
        }
        else{
            navbarAccount=
                <ul className="navbar_account">
                    <li><Link to='/login'>로그인</Link></li>
                    <li id="navbar_account_join"><a href='/join'>회원가입</a></li>
                </ul>
        }
               
        return(
            <nav className="navbar">
                <div className="navbar_logo">
                    <i className="fas fa-futbol"></i>
                    <a href="/">M9SOCCER</a>
                </div>
                
                <ul className="navbar_menu">
                    <li><Link to="/">홈</Link></li>
                    <li><a href="/reservation">운동장 예약</a></li>
                    <li><a href="/test">문의하기</a></li>
                </ul>
                {navbarAccount}
            </nav>
        );
    }
}
export default Nav;