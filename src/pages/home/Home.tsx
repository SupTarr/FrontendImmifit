import React, { useState, useEffect } from "react";
import Container from "../../components/container/Container";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Profile from "../profile/Profile";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";

interface UserAuth {
  user: string;
  userId: string;
}

interface ProfileData {
  id?: number;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface UserResponse {
  profile?: ProfileData;
}

const Home: React.FC = () => {
  const { auth } = useAuth() as { auth: UserAuth };
  const user = auth.user;

  const [createdProfile, setCreatedProfile] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>({});

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const res: AxiosResponse<UserResponse> = await axios.get(
          `/users/${auth.userId}`,
        );
        if (res.data.profile !== undefined) {
          setProfile(res.data.profile);
          if (res.data.profile !== null) {
            setCreatedProfile(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [auth.userId]);

  return (
    <div className="home min-h-screen">
      <div>
        <Navbar />
        <div className="tablet:flex-col mx-auto flex max-w-[1450px]">
          <div className="Profile tablet:w-[100%] max-h-[700px] w-[40%]">
            <Profile
              username={user}
              createdProfile={createdProfile}
              profile={profile}
            />
          </div>
          <div className="Activities tablet:mx-[2.5%] tablet:w-[95%] mx-5 w-[60%] rounded-xl bg-[#fbc3bc]">
            <div className="flex flex-wrap justify-around">
              <Container username={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
