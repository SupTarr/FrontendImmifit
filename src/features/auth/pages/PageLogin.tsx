import LoginContainer from "../components/LoginContainer.tsx";

const PageLogin = () => {
  return (
    <section className="page-login bg-neutral-content flex min-h-screen flex-col flex-wrap content-center justify-center">
      <div className="card bg-base-100 md:card-side mx-5 max-w-9/12 drop-shadow-2xl">
        <figure className="md:max-w-[50%]">
          <img src="/cover.jpg" alt="Album" />
        </figure>
        <div className="card-body">
          <LoginContainer />
        </div>
      </div>
    </section>
  );
};

export default PageLogin;
