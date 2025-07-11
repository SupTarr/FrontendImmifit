import Navbar from "../components/ui/Navbar";
import ProfileCard from "../../features/profile/components/ProfileCard";
import Footer from "../components/ui/Footer";
import DefaultProfileCard from "../../features/profile/components/DefaultProfileCard";
import { useContext } from "react";
import ProfileContext from "../../features/profile/context/ProfileProvider";

const PageHome = () => {
  const { profile } = useContext(ProfileContext);

  return (
    <section className="page-home min-h-screen">
      <Navbar />
      <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center pt-[64px] pb-[52px]">
        {profile.profileId ? <ProfileCard /> : <DefaultProfileCard />}
      </div>
      <Footer />
    </section>
  );
};

export default PageHome;
