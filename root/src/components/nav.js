import React, {Component} from 'react';
import '../css/nav.css';
class Nav extends Component{
    render(){
        console.log(this.props);
        let navbarAccount;
        if(this.props.account!=='' && this.props.account!=='admin'){
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
                    <li><a href='/login'>로그인</a></li>
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
                    <li><a href="/">홈</a></li>
                    <li><a href="/reservation">운동장 예약</a></li>
                    <li><a href="/test">문의하기</a></li>
                </ul>
                {navbarAccount}
            </nav>
        );
    }
}
export default Nav;