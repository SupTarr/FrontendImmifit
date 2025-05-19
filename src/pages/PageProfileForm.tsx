import Navbar from "../components/Navbar";
import ProfileFormContainer from "../containers/ProfileFormContainer";
import Footer from "../components/Footer";

const PageProfileForm = () => {
  return (
    <section className="page-profile-form min-h-screen">
      <Navbar />
      <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center pt-[64px] pb-[52px]">
        <div className="card bg-base-100 mx-5 max-w-9/12 p-5 drop-shadow-2xl sm:min-w-100">
          <ProfileFormContainer />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PageProfileForm;
