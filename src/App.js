import React, {Component} from 'react';
import Nav from './components/nav';
import Footer from './components/footer';
import Section from './components/section_home';
import './App.css';
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
    console.log('아니 되긴하냐');
    return(
      <div className="App">
        <Nav account={this.state.account}></Nav>
        <Section></Section>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
