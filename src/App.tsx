import { useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { ProfileProvider } from "./features/profile/context/ProfileProvider.tsx";
import useRefreshToken from "./features/auth/hooks/useRefreshToken.tsx";
import { setupAxiosInterceptors } from "./shared/api/interceptor.ts";
import RequireAuth from "./shared/components/RequireAuth.tsx";

const PageLoading = lazy(() => import("./shared/pages/PageLoading.tsx"));
const Page404 = lazy(() => import("./shared/pages/Page404.tsx"));
const PageLogin = lazy(() => import("./features/auth/pages/PageLogin.tsx"));
const PageRegister = lazy(
  () => import("./features/auth/pages/PageRegister.tsx"),
);
const PageHome = lazy(() => import("./shared/pages/PageHome.tsx"));
const PageProfileForm = lazy(
  () => import("./features/profile/pages/PageProfileForm.tsx"),
);

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
              <Route path="/profile" element={<PageProfileForm />} />
            </Route>
            <Route path="*" Component={Page404} />
          </Routes>
        </Suspense>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
