import { Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import RequireAuth from "./components/requireAuth/RequireAuth";
import Profilesform from "./pages/profiles-form/profiles-form";

import Layout from "./components/layout/Layout";

interface RolesType {
  User: string;
}

const ROLES: RolesType = {
  User: "1000",
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
          <Route path="form" element={<Form />} />
          <Route path="form_profile" element={<Profilesform />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
