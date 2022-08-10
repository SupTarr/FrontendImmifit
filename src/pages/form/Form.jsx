import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormDetail from "../../components/form-component/FormDetail";
import HeaderForm from "../../components/form-component-header/header-form";
import Footer from "../../components/footer/Footer";
import "./form.css";

function Form() {
  return (
    <div>
      <Navbar />
      <div>
        <HeaderForm />
        <FormDetail />
      </div>
    </div>
  );
}

export default Form;
