import React, {Component, useState} from 'react';
import '../css/footer.css';


function Footer(){
    const [test,setTest]=useState([0]);
    console.log("footer");
    return(
        <ul className="footer">
            <li>M9SOCCER</li>
            <li>Tell: 010-3454-7128</li>
            <li>Email: alsrnalsrn94@naver.com</li>
            <li>Copyright 2020. MINKOO HAN. all rights reserved.</li>
        </ul>
    );
}


export default Footer;