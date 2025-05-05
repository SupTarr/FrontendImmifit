import React, { useState, useEffect } from "react";
import Container from "../../components/container/Container";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Profile from "../profile/Profile";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";

// Define interfaces for the data types
interface UserAuth {
  user: string;
  user_id: string;
  // Add other auth properties that might be used
}

interface ProfileData {
  // Define profile properties based on your API response
  id?: number;
  name?: string;
  email?: string;
  // Add other profile fields as needed
  [key: string]: any; // Allow for additional dynamic properties
}

interface UserResponse {
  profile?: ProfileData;
  // Add other response properties if needed
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
          `/users/${auth.user_id}`,
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
  }, [auth.user_id]); // Add auth.user_id as dependency

  return (
    <div className="home min-h-screen">
      <div>
        <Navbar />
        <div className="mx-auto flex max-w-[1450px] tablet:flex-col">
          <div className="Profile max-h-[700px] w-[40%] tablet:w-[100%]">
            <Profile
              username={user}
              createdProfile={createdProfile}
              profile={profile}
            />
          </div>
          <div className="Activities mx-5 w-[60%] rounded-xl bg-[#fbc3bc] tablet:mx-[2.5%] tablet:w-[95%]">
            {/* <Header /> */}
            <div className="flex flex-wrap justify-around">
              <Container username={user} />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
