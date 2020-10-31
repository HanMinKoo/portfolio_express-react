import React, {Component} from 'react';
import ReservationNotice from '../components/home_reservationNotice.jsx';
import ReviewNotice from '../components/home_reviewNotice.jsx';


const Home = () =>{
  return(
    <>
      <ReservationNotice></ReservationNotice>
      <ReviewNotice></ReviewNotice>
    </>
  );
}

export default Home;