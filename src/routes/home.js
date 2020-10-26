import React, {Component} from 'react';
import Footer from '../components/footer';
import Section from '../components/section_home';
import Nav from '../components/nav';

class Home extends Component{
  render(){
    return(
      <div className="App">
        <Nav></Nav>
        <Section></Section>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
