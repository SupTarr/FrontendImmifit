import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";

const PageHome = () => {
  return (
    <section className="page-home min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 pt-[64px] pb-[52px]">
        <ProfileCard />
      </div>
      <Footer />
    </section>
  );
};

export default PageHome;
