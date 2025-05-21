import { useEffect, Suspense, lazy, FC } from "react"; // Import FC for functional component typing
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProfileProvider } from "./context/ProfileProvider";
import useRefreshToken from "./hooks/useRefreshToken";
import { setupAxiosInterceptors } from "./api/interceptor.ts";
import RequireAuth from "./components/RequireAuth.tsx";

// Lazy load page components for better initial load performance.
// These components will be loaded only when they are needed.
const PageLoading = lazy(() => import("./pages/PageLoading.tsx"));
const Page404 = lazy(() => import("./pages/Page404.tsx"));
const PageLogin = lazy(() => import("./pages/PageLogin.tsx"));
const PageRegister = lazy(() => import("./pages/PageRegister.tsx"));
const PageHome = lazy(() => import("./pages/PageHome.tsx"));
const PageProfileForm = lazy(() => import("./pages/PageProfileForm.tsx"));

/**
 * Main application component.
 * Sets up context providers (Auth, Profile), routing, and Axios interceptors.
 *
 * @returns The main application structure with routes and context providers.
 */
const App: FC = () => {
  // useRefreshToken hook provides the function to refresh the authentication token.
  const refresh = useRefreshToken();

  // useEffect hook to set up Axios interceptors when the component mounts or `refresh` function changes.
  // Axios interceptors are used to automatically attach the access token to requests
  // and to handle token refresh logic when a 401 Unauthorized response is received.
  useEffect(() => {
    // Pass the `refresh` function to the interceptor setup.
    // This allows the interceptor to call `refresh` when a token needs to be renewed.
    setupAxiosInterceptors(refresh);
  }, [refresh]); // Dependency array ensures this effect runs if `refresh` function instance changes.

  return (
    // AuthProvider makes authentication state (like accessToken) available to its children.
    <AuthProvider>
      {/* ProfileProvider manages user profile data and makes it available to its children. */}
      <ProfileProvider>
        {/* Suspense is used for code-splitting with React.lazy.
            It shows a fallback UI (PageLoading) while lazy-loaded components are being fetched. */}
        <Suspense fallback={<PageLoading />}>
          {/* Routes component defines the application's routing structure. */}
          <Routes>
            {/* Public routes for login and registration. */}
            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegister />} />

            {/* Protected routes that require authentication.
                The RequireAuth component checks for authentication. If not authenticated,
                it typically redirects to the login page. */}
            <Route element={<RequireAuth />}>
              {/* Route for the home page. */}
              <Route path="/" element={<PageHome />} />
              {/* Route for the user profile form page. */}
              <Route path="/profile" element={<PageProfileForm />} />
            </Route>

            {/* Catch-all route for any undefined paths, displays a 404 page. */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
