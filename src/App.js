import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Nav from './components/nav';
import Login from './routes/login';
import Home from './routes/home'
import Join from './routes/join'

import axios from 'axios';

class App extends Component{
  state={
    account: null
  }

  getData = async () =>{
    const {data} = await axios.get('http://localhost:8004/api/home');
    console.log("account:",data[0].account);
    this.setState({account:data[0].account});

  }
  componentDidMount(){
    this.getData();
  }
  
  render(){
    return(
      <BrowserRouter>
        <Nav account={this.state.account}></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
