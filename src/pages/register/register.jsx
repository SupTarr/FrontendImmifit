import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./register.css";
import registerForm from "../../components/register/registerForm";

function Register() {
  return (
    <div>
      <Navbar />
      <div>
        <Header />
        <registerForm />
        <Footer />
      </div>
    </div>
  );
}

export default Register;