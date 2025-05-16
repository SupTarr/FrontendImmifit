import { Link } from "react-router-dom";
import { Login } from "../Links.tsx";

const Page404 = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-4 text-5xl font-bold">404</h1>
          <h2 className="text-4xl font-bold">Not Found</h2>
          <p className="py-6">Something went wrong! Please try again.</p>
          <Link className="link link-primary mt-5 text-center" to={Login}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
