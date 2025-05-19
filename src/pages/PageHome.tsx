import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";

const PageHome = () => {
  return (
    <section className="page-home min-h-screen">
      <Navbar />
      <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center pt-[64px] pb-[52px]">
        <ProfileCard />
      </div>
      <Footer />
    </section>
  );
};

export default PageHome;
