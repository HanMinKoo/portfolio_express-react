import React, {Component} from 'react';
import '../css/reservation.css';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import ground_detail from './ground_detail';
import queryString from 'query-string';

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
        let resrvationHTML=[];
        const queryValue=queryString.parse(this.props.location.search);
        console.log("queryValue",queryValue);

        if(queryValue.number===undefined){
            if(Object.keys(this.state.groundList).length!==0){
                //console.log('groundList 이름',this.state.groundList[0].ground_name);
                for(let i=0; i<Object.keys(this.state.groundList).length; i++){
                    let imgSrc=`../images/groundImg/${this.state.groundList[i].img_directory_path}/${this.state.groundList[i].img_name}`;
                    
                    let path= `/reservation/?number=${this.state.groundList[i].id}`
                
                    resrvationHTML[i]=
                        <section>
                            <Link to={path}>
                                    <img className="groundImg" src={imgSrc}/>
                                    <h2 className="groundName">{this.state.groundList[i].name}</h2>
                                    <ul>
                                        <li className="groundInfo"><h3>이용 시간:{this.state.groundList[i].use_time} </h3></li>
                                        <li className="groundInfo"><h3>위치:{this.state.groundList[i].location} </h3></li>
                                        <li className="groundInfo"><h3>가격: {this.state.groundList[i].price}</h3></li>   
                                    </ul>
                            </Link>
                                        
                        </section>
                }   
            }
        }
        else{
            
        }
        return(
            <div id="groundListBackGround">
                <article id="groundList_wrap">
                    <h1>운동장 리스트</h1>
                    {resrvationHTML}
                </article> 
            </div>
        );
    }
}
export default Ground_List;