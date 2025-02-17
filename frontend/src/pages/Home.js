import React from "react";
import Navigation from "../components/Navigation";
import Image from "../components/Image";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div>
        <Image />
      </div>
      <div><Footer/></div>
    </>
  );
};

export default Home;
