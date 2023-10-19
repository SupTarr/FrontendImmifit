import { Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import RequireAuth from "./components/requireAuth/RequireAuth";
// import Passreset from "./pages/password-reset/password-reset";
// import Forgotpassword from "./pages/forgot-password/forgot-password";
import Profilesform from "./pages/profiles-form/profiles-form";

import Layout from "./components/layout/Layout";

const ROLES = {
  User: 1000,
  Editor: 2000,
  Admin: 3000,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
          <Route path="form" element={<Form />} />
          <Route path="form_profile" element={<Profilesform />} />
        </Route>

        {/*
        <Route path="/password_reset/" element={<Passreset />} />
        <Route path="/forget_password/" element={<Forgotpassword />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/register/:id" element={<Register />} />
        */}
      </Route>
    </Routes>
  );
}

export default App;
