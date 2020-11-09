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
                <li className="js-logout">로그아웃</li>
                <li className="page"><Link to='/mypage'>마이 페이지</Link></li>
            </ul>
            
    }
    else if(account === 'admin'){
        navbarAccount=
            <ul className="navbar_account">
                <li>{account}</li>
                <li className="js-logout">로그아웃</li>
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
            url:'/api/getsession'
        })
        .then((res)=>{
            const {account, message} = res.data[0];
            console.log('session call: ',message);
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
        console.log('res: ',res);
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
                    <li><Link to="/ground">운동장 예약</Link></li>
                    <li><Link to="/test">문의하기</Link></li>
                </ul>
                {loginInfojsx}
            </nav>
        </>

    );
}
// class Nav extends Component{
//     state={
//         account: '',
//       }
//       clickLogoutEvent(){
//           const logout = document.querySelector('.js-logout');
//           logout.addEventListener('click',function(){
              
//           });
//       }

//       componentDidMount(){;
          
//            axios({
//              method:'get',
//              url:'/api/getsession'
//            })
//            .then((res)=>{

//              const {account, message} = res.data[0];
//              console.log('session call: ',message);
//              this.setState({account});

//            }).catch((error)=>{
//             console.log('session call error: ', error);
//            });
//       }

//     render(){ 
//         let navbarAccount;
//         if(this.state.account!=='' && this.state.account!=='admin' && this.state.account!==undefined){

//             navbarAccount=
//                 <ul className="navbar_account">
//                     <li>{this.state.account}</li>
//                     <li className="js-logout">로그아웃</li>
//                     <li className="page"><Link to='/mypage'>마이 페이지</Link></li>
//                 </ul>
                
//         }
//         else if(this.state.account==='admin'){
//             navbarAccount=
//                 <ul className="navbar_account">
//                     <li>{this.state.account}</li>
//                     <li className="js-logout">로그아웃</li>
//                     <li className="page"><Link to='/adminpage'>관리자 페이지</Link></li>
//                 </ul>
//         }
//         else{
//             navbarAccount=
//                 <ul className="navbar_account">
//                     <li><Link to='/login'>로그인</Link></li>
//                     <li id="navbar_account_join"><Link to='/join'>회원가입</Link></li>
//                 </ul>
//         }
               
//         return(
//             <>
//                 <div className="navbar_topbox"></div>
//                 <nav className="navbar">
//                     <div className="navbar_logo">
//                         <Link to="/">M9SOCCER</Link>
//                     </div>
                    
//                     <ul className="navbar_menu">
//                         <li><Link to="/">홈</Link></li>
//                         <li><Link to="/ground">운동장 예약</Link></li>
//                         <li><Link to="/test">문의하기</Link></li>
//                     </ul>
//                     {navbarAccount}
//                 </nav>
//             </>
            
//         );
//     }
// }
export default Nav;