import React, {Component} from 'react';
import '../css/join.css';
import Nav from '../components/nav';
import Join_component from '../components/join_component';

class Join extends Component{
    render(){
        return(
            <div>
                <Nav></Nav>
                <Join_component></Join_component>
              
            </div>
        );
    }
}

export default Join;