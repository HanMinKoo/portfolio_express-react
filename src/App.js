import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Footer from './components/footer';
import Nav from './components/nav';
import Login from './routes/login';
import Home from './routes/home';
import Join from './routes/join';
import GroundList from './routes/ground_list';
import GroundDetail from './routes/ground_detail';
import AdminPage from './routes/adminpage';
import MyPage from './routes/mypage';
import Inquire from './routes/inquire';

class App extends Component{
  render(){
    const title = document.querySelector("title");
    title.innerText="React Portfolio";

    return(
      <>
     
      <BrowserRouter>
      <Nav></Nav>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/join" component={Join}></Route>
        <Route path="/ground" exact={true} component={GroundList}></Route>
        <Route path="/ground/detail" component={GroundDetail}></Route>
        <Route path="/adminpage" component={AdminPage}></Route>
        <Route path="/mypage" component={MyPage}></Route>
        <Route path="/inquire" component={Inquire}></Route>
        <Footer></Footer>
      </BrowserRouter>
    
      </>
    );
  }
}

export default App;
