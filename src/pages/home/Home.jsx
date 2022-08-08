import React from "react";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div>
      <Navbar />
      <div className="header">
        <Header />
      </div>
        
      <div className="container">
        <Container />
        <Footer />
      </div>
    </div>
    </div>
    
  );
}

export default Home;
