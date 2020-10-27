import React, {Component} from 'react';
import '../css/reservation.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import ground_detail from './ground_detail';

class Ground_List extends Component{
    state={
        groundList:[],
        routePage:false,
        ground_id:null
    }

    movePage=(id)=>{ //arrow function으로 해야 this가 부모(컴포넌트)의 this를 가리킴. 
        //만약 arrow function으로 안하면 this가 movePage를 가리키니깐 this.setState 함수를 사용할 수 없음
        
        this.setState({routePage:true, ground_id:id});
        
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
        if(this.state.routePage){
            let path=`/reservation/number=${this.state.ground_id}`;
            return <Route path={path} component={ground_detail}></Route>;
        }

        let resrvationHTML=[];
        //console.log('ground길이,',Object.keys(this.state.groundList).length);
        if(Object.keys(this.state.groundList).length!==0){
            //console.log('groundList 이름',this.state.groundList[0].ground_name);
            
            for(let i=0; i<Object.keys(this.state.groundList).length; i++){
                let imgSrc=`../images/groundImg/${this.state.groundList[i].img_directory_path}/${this.state.groundList[i].img_name}`;
                
                //let path=`/reservation/number=${this.state.groundList[i].id}`
                resrvationHTML[i]=
                    <section>
                        <button className="groundListBtn" onClick={()=>this.movePage(this.state.groundList[i].id)} >
                            <img className="groundImg" src={imgSrc}/>
                            <h2 className="groundName">{this.state.groundList[i].name}</h2>
                            <ul>
                                <li className="groundInfo"><h3>이용 시간:{this.state.groundList[i].use_time} </h3></li>
                                <li className="groundInfo"><h3>위치:{this.state.groundList[i].location} </h3></li>
                                <li className="groundInfo"><h3>가격: {this.state.groundList[i].price}</h3></li>   
                            </ul>
                        </button>                
                    </section>
            }   
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