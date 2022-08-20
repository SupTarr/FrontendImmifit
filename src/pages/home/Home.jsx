import React from "react";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Profile from "../profile/Profile";
import axios from "axios";
import cors from "cors"

function Home() {
  return (
    <div className="home">
      <div>
        <Navbar />
        <div className="flex tablet:flex-col max-w-[1450px] mx-auto">
          <div className="Profile w-[40%] tablet:w-[100%] mb-5">
            <Profile />
          </div>
          <div className="Activities w-[60%] tablet:w-[95%] tablet:mx-[2.5%] mx-5 mb-5 bg-[#fbc3bc] rounded-xl">
            <Header />
            <div className="flex justify-around flex-wrap">
              <Container />
              <Container />
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
