import React, {Component} from 'react';
import Footer from '../components/footer';
import Section from '../components/section_home';

class Home extends Component{
  render(){
    console.log('아니 되긴하냐');
    return(
      <div className="App">
        <Section></Section>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
