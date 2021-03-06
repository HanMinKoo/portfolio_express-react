import React, {useState,useEffect} from 'react';
import '../css/nav.css';
import  {Link} from "react-router-dom"; 
import axios from 'axios';
import hamburgerBtn from '../images/hamburger.png';

//이 함수만든 이유는 반응형에서 햄버거 바가 생겨서 Link 메뉴를 눌렀어.
//그런데 페이지가 이동 해도 햄버거바로 활성화된 메뉴들이 다시 비활성화 되지 않아.
//그래서 그게 불편해서 비활성화 시킬려고 이 함수를 만듬. 
function actvieMenuLink(){
    const menu = document.querySelector('.navbar_menu');
    const icon = document.querySelector('.navbar_account');
    const menuLink = document.querySelectorAll('.js-link');
    
    for(let i=0; i<menuLink.length; i++){
        //console.log("test");
        menuLink[i].addEventListener('click', () =>{
            menu.classList.remove('active');
            icon.classList.remove('active');
        });
    }
}

function initHamburgerBtn(){
    const hamburgerBtn=document.querySelector('.js-navbar_hamburgerBtn');
    const menu = document.querySelector('.navbar_menu');
    const icon = document.querySelector('.navbar_account');

    hamburgerBtn.addEventListener('click',()=>{
        console.log("click");
        menu.classList.toggle('active');
        icon.classList.toggle('active');
    });
}

const initJSX = (account) =>{
    let navbarAccount;
        
    if(account !=='' && account !=='admin' && account !== undefined){

        navbarAccount=
            <ul className="navbar_account">
                <li>{account}</li>
                <li className="js-logout"><Link to ='/'>로그아웃</Link></li>
                <li className="page"><Link to='/mypage'>마이 페이지</Link></li>
            </ul>
            
    }
    else if(account === 'admin'){
        navbarAccount=
            <ul className="navbar_account">
                <li>{account}</li>
                <li className="js-logout"><Link to ='/'>로그아웃</Link></li>
                <li className="page"><Link to='/adminpage'>관리자 페이지</Link></li>
            </ul>
    }
    else{
        navbarAccount=
            <ul className="navbar_account">
                <li className="js-link"><Link to='/login'>로그인</Link></li>
                <li className="js-link navbar_account_join"><Link to='/join'>회원가입</Link></li>
            </ul>
    }
    return navbarAccount;
}

function fetchloginInfo(setAccount){
    axios({
            method:'get',
            url:'/session'
        })
        .then((res)=>{
            const {account} = res.data;
            setAccount(account);
        }).catch((error)=>{
            console.log('session call error: ', error);
    });
}

function processLogout(setAccount){
    axios({
        method:'get',
        url:'/logout'
    })
    .then((res)=>{
        const {result} = res.data;
        setAccount(result);
    }).catch((error)=>{
        alert(error);
        console.log('logout error: ', error);
    });
}

function clickLogoutEvent(setAccount){
    const logout = document.querySelector('.js-logout');
    logout.addEventListener('click',function(){
        processLogout(setAccount); 
    });
}

const Nav = () =>{
    const [account, setAccount] = useState('');

    const loginInfojsx=initJSX(account);
    useEffect(()=>{
        fetchloginInfo(setAccount);
        initHamburgerBtn();
        actvieMenuLink();
    },[]);
    useEffect(()=>{
        if(account === '')
            return;
        else 
            clickLogoutEvent(setAccount);
    });
    return(
        <>
            <nav className="navbar">
                <div className="navbar_logo">
                    <Link to="/">MK GROUND</Link>
                </div>
                <ul className="navbar_menu">
                    <li className="js-link menuTop"><Link to="/">홈</Link></li>
                    <li className="js-link"><Link to="/ground" >운동장 예약</Link></li>
                    <li className="js-link"><Link to="/inquire">문의하기</Link></li>
                </ul>
                {loginInfojsx}
                <li className="navbar_hamburgerBtn js-navbar_hamburgerBtn">
                    <img src={hamburgerBtn}></img>
                </li>
            </nav>
            
        </>

    );
}

export default Nav;