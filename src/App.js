import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Nav from './components/nav';
import Login from './routes/login';
import Home from './routes/home';
import Join from './routes/join';
import Ground_List from './components/ground_list';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Nav></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
        <Route path="/reservation" exact={true} component={Ground_List}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
