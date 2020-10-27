import React, {Component} from 'react';
import Footer from '../components/footer';
import Section from '../components/section_home';

class Home extends Component{
  render(){
    return(
      <div className="App">
        <Section></Section>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
