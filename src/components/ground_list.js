import React, {Component} from 'react';
import '../css/ground.css';
import axios from 'axios';

import {Link} from 'react-router-dom';

class Ground_List extends Component{
    state={
        groundList:[],
    }

    componentDidMount(){
        axios({
            method:'get',
            url:'/reservation'
        }).then((res)=>{
            //console.log(res.data.groundList);
            const {...groundInfo}=res.data.groundList;
            this.setState({groundList:groundInfo});
        });
    }
   
    render(){
        console.log('왜 3번이니');
        let resrvationHTML=[];
    
        if(Object.keys(this.state.groundList).length!==0){
            //console.log('groundList 이름',this.state.groundList[0].ground_name);
            for(let i=0; i<Object.keys(this.state.groundList).length; i++){
                let imgSrc=`../images/groundImg/${this.state.groundList[i].img_directory_path}/${this.state.groundList[i].img_name}`;
                
                let path= `/ground/detail?number=${this.state.groundList[i].id}`
            
                resrvationHTML[i]=

                    <div className="groundList_content">
                        <Link to={path}>
                            <img className="groundImg" src={imgSrc}/>
                            <ul className="groundInfo_NameLocation">
                                <li><h2>{this.state.groundList[i].name}</h2></li>
                                <li className="groundInfo"><h3>{this.state.groundList[i].location} </h3></li>
                            </ul>
                            <ul className="groundInfo_TimePrice">
                                <li className="groundInfo"><h3>{this.state.groundList[i].use_time} </h3></li>
                                <li className="groundInfo"><h3>{this.state.groundList[i].price} 만원</h3></li> 
                            </ul>
                        </Link>
                    </div> 
            }   
        }
        return(
            <article className="groundList_wrap">
                <h1>운동장 리스트</h1>
                {resrvationHTML}
            </article> 
        );
    }
}
export default Ground_List;