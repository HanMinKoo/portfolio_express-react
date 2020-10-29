import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Nav from './components/nav';
import Login from './routes/login';
import Home from './routes/home';
import Join from './routes/join';
import GroundList from './components/ground_list';
import GroundDetail from './components/ground_detail';
import History from './components/history';

class App extends Component{
  render(){
    
    return(
      <BrowserRouter history={History}>
        <Nav></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
        <Route path="/reservation" exact={true} component={GroundList}></Route>
        <Route path="/test" exact={true} component={GroundDetail}></Route>
       
      </BrowserRouter>
    );
  }
}

export default App;
