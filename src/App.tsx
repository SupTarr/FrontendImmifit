import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProfileProvider } from "./context/ProfileProvider";
import useRefreshToken from "./hooks/useRefreshToken";
import { setupAxiosInterceptors } from "./api/interceptor.ts";

import Form from "./pages/form/Form";
import RequireAuth from "./components/RequireAuth.tsx";
import Profilesform from "./pages/profiles-form/profiles-form";

const PageLoading = lazy(() => import("./pages/PageLoading.tsx"));
const Page404 = lazy(() => import("./pages/Page404.tsx"));
const PageLogin = lazy(() => import("./pages/PageLogin.tsx"));
const PageRegister = lazy(() => import("./pages/PageRegister.tsx"));
const PageHome = lazy(() => import("./pages/PageHome.tsx"));

const App: React.FC = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    setupAxiosInterceptors(refresh);
  }, [refresh]);

  return (
    <AuthProvider>
      <ProfileProvider>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<PageHome />} />
              <Route path="/form/activites" element={<Form />} />
              <Route path="/form/profile" element={<Profilesform />} />
            </Route>
            <Route path="*" Component={Page404} />
          </Routes>
        </Suspense>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
