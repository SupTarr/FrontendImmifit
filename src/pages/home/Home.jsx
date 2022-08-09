import React from "react";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Profile from "../profile/Profile";

function Home() {
  return (
    <div className="home">
      <div>
        <Navbar />
        <div className="flex flex-wrap max-w-[1300px] mx-auto">
          <div className="Profile w-[40%]">
            <Profile />
          </div>
          <div className="Activities max-w-[60%]">
            <Header />
            <Container />
            <Container />
            <Container />
            <Footer />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
