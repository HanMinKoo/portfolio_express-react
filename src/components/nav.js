import React, {useState,useEffect} from 'react';
import '../css/nav.css';
import  {Link} from "react-router-dom"; 
import axios from 'axios';

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
                <li><Link to='/login'>로그인</Link></li>
                <li id="navbar_account_join"><Link to='/join'>회원가입</Link></li>
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
            //console.log("account", account);
            //console.log('session call: ',message);
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
        //console.log('res: ',res);
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
    },[]);
    useEffect(()=>{
        if(account === '')
            return;
        else clickLogoutEvent(setAccount);
    });
    return(
        <>
            <div className="navbar_topbox"></div>
            <nav className="navbar">
                <div className="navbar_logo">
                    <Link to="/">M9SOCCER</Link>
            </div>
                <ul className="navbar_menu">
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/ground" test="가나다라마바사t">운동장 예약</Link></li>
                    <li><Link to="/inquire">문의하기</Link></li>
                </ul>
                {loginInfojsx}
            </nav>
        </>

    );
}

export default Nav;