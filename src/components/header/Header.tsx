import React, { useContext, useEffect, useState, MouseEvent } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./header.css";
import Card from "../card/Card";
import axios, { AxiosResponse } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { AuthContextType } from "../../context/AuthProvider";

// Interface for Activity
interface ActivityItem {
  activity_id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  activity_type: string;
  description: string;
  img: {
    url: string;
    name?: string;
  };
  [key: string]: any;
}

// Interface for Header component props
interface HeaderProps {
  allUsers: ActivityItem[];
  getUsers: () => Promise<void>;
  setAllUsers: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
}

const Header = ({ allUsers, getUsers, setAllUsers }: HeaderProps): JSX.Element => {
  const { auth } = useAuth();

  console.log("this is allusers", allUsers);

  const fetchDataByType = async (type?: string): Promise<void> => {
    console.log("this is users", allUsers);
    console.log("This is type", type);

    if (!type || !auth.user) return;

    try {
      console.log(type, allUsers);
      const res: AxiosResponse<ActivityItem[]> = await axios.get(`/activities/bytype/${auth.user}/${type}`);
      console.log("fetchDatabyType", res.data);
      setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClickSortAll = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getUsers();
  };

  const handleClickSortRun = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    fetchDataByType("Running");
  };

  const handleClickSortSwim = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    fetchDataByType("Swimming");
  };

  const handleClickSortOther = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    fetchDataByType(target.value);
  };

  return (
    // filter
    // ["Running", "Cycling", "Swimming", "Weight training", "Walking"]
    <div className="Header mt-5 flex justify-between flex-wrap xl:w-[700px] md:w-[450px] relative z-40">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg">
        <button
          className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold"
          value="All"
          onClick={handleClickSortAll}
        >
          ALL
        </button>
        <button
          className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold"
          value="Running"
          onClick={handleClickSortRun}
        >
          RUN
        </button>
        <button
          className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold"
          value="Swimming"
          onClick={handleClickSortSwim}
        >
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <div className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <button className="mr-1" value="Bike">
                Other
              </button>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </div>

            <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <button
                className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap"
                value="Weight training"
                onClick={handleClickSortOther}
              >
                Weight training
              </button>
              <button
                className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap"
                value="Cycling"
                onClick={handleClickSortOther}
              >
                Cycling
              </button>
              <button
                className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap"
                value="Walking"
                onClick={handleClickSortOther}
              >
                Walking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ commented code properly typed
      <div className="Card flex flex-row flex-wrap ">
        {allUsers.map((user: ActivityItem, index: number) => (
          <Card 
            key={index} 
            user={user}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Header;

