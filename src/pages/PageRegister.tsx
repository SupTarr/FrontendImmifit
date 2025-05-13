import RegisterContainer from "../containers/RegisterContainer";

const PageRegister = () => {
  return (
    <section className="page-register flex min-h-screen flex-col flex-wrap justify-center content-center bg-neutral-content">
      <div className="card mx-5 bg-base-100 drop-shadow-2xl md:card-side max-w-9/12">
        <figure className="md:max-w-[50%]">
          <img
            src="/imagecard2.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <RegisterContainer />
        </div>
      </div>
    </section>
  );
};

export default PageRegister;
