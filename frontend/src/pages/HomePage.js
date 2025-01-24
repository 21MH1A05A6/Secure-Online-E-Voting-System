import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import the Footer component

import ImageCarousel from '../components/ImageCarousel';

export default function HomePage() {
 
  return (
      <div >
          <div><Navbar /></div>
          <div><ImageCarousel/></div>
          
             
              

          
          <div><Footer /></div>
          {/* <div>Body</div> */}
      </div>

  )
}
