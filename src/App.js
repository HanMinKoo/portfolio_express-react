import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Footer from './components/footer';
import Nav from './components/nav';
import Login from './routes/login';
import Home from './routes/home';
import Join from './routes/join';
import GroundList from './components/ground_list';
import GroundDetail from './components/ground_detail';


class App extends Component{
  render(){
    console.log("이게 두번인가");
    return(
      <BrowserRouter>
        <Nav></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
        <Route path="/ground" exact={true} component={GroundList}></Route>
        <Route path="/ground/detail" component={GroundDetail}></Route>
        
        
        <Route path="/test" exact={true} component={Footer}></Route>
        <Footer></Footer>
        
       
      </BrowserRouter>
    );
  }
}

export default App;
