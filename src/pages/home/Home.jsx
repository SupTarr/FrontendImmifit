import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Profile from "../profile/Profile";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function Home() {
  const { auth } = useAuth();
  const user = auth.user;

  const [createdProfile, setCreatedProfile] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`/users/${auth.user_id}`).then((res) => {
      if (res.data.profile !== undefined) {
        setProfile(res.data.profile)
        if (profile !== null) {
          setCreatedProfile(true);
        }
      }
    })
  }, [])

  console.log(profile);

  return (
    <div className="home min-h-screen">
      <div>
        <Navbar createdProfile={createdProfile} />
        <div className="flex tablet:flex-col max-w-[1450px] mx-auto">
          <div className="Profile w-[40%] tablet:w-[100%] max-h-[700px]">
            <Profile username={user} createdProfile={createdProfile} profile={profile} />
          </div>
          <div className="Activities w-[60%] tablet:w-[95%] tablet:mx-[2.5%] mx-5 bg-[#fbc3bc] rounded-xl">
            {/* <Header /> */}
            <div className="flex justify-around flex-wrap">
              <Container username={user} />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;