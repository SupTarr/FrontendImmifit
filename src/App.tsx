import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import RequireAuth from "./components/requireAuth/RequireAuth";
import DelayRender from "./components/DelayRender";
import Profilesform from "./pages/profiles-form/profiles-form";

const PageLoading = lazy(() => import("./pages/PageLoading.tsx"));
const Page404 = lazy(() => import("./pages/Page404.tsx"));
const PageLogin = lazy(() => import("./pages/PageLogin.tsx"));
const PageRegister = lazy(() => import("./pages/PageRegister.tsx"));

interface RolesType {
  User: string;
}

const ROLES: RolesType = {
  User: "1000",
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <DelayRender delay={500}>
        <Routes>
          <Route path="login" element={<PageLogin />} />
          <Route path="register" element={<PageRegister />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
            <Route path="form" element={<Form />} />
            <Route path="form_profile" element={<Profilesform />} />
          </Route>
          <Route path="*" Component={Page404} />
        </Routes>
      </DelayRender>
    </Suspense>
  );
};

export default App;
