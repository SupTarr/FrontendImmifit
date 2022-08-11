import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Passreset from "./pages/password-reset/password-reset";
import Forgotpassword from "./pages/forgot-password/forgot-password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/" element={<Form />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/password_reset/" element={<Passreset />} />
        <Route path="/forget_password/" element={<Forgotpassword/>} />
        {/* <Route path="/form/:id" element={<Form />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/register/:id" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
