import React,{useEffect,useState} from 'react';
import '../css/footer.css';


function Footer(){
    //const [test,setTest]= useState('');
    //console.log('test123',test);
    return(
        <ul className="footer">
            {//<button onClick={()=>setTest('asd')}>asd</button>
            }
            <li>MK GROUND</li>
            <li>Tell: 010-3454-7128</li>
            <li>Email: alsrnalsrn94@naver.com</li>
            <li>Copyright 2020. MINKOO HAN. all rights reserved.</li>
        </ul>
    );
}


export default Footer;