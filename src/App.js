import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './routes/login';
import Home from './routes/home';
import Join from './routes/join';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
      </BrowserRouter>
    );
  }
}

export default App;
