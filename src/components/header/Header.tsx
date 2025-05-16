import React, { useEffect, MouseEvent } from "react";
import "./header.css";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";
import useAuth from "../../hooks/useAuth";

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

interface HeaderProps {
  allUsers: ActivityItem[];
  getUsers: () => Promise<void>;
  setAllUsers: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
}

const Header = ({
  allUsers,
  getUsers,
  setAllUsers,
}: HeaderProps): JSX.Element => {
  const { auth } = useAuth();

  console.log("this is allusers", allUsers);

  const fetchDataByType = async (type?: string): Promise<void> => {
    console.log("this is users", allUsers);
    console.log("This is type", type);

    if (!type || !auth.user) return;

    try {
      console.log(type, allUsers);
      const res: AxiosResponse<ActivityItem[]> = await axios.get(
        `/activities/bytype/${auth.user}/${type}`,
      );
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
    <div className="Header relative z-40 mt-5 flex flex-wrap justify-between md:w-[450px] xl:w-[700px]">
      <div className="Container bg-opacity-50 rounded-full bg-white drop-shadow-lg backdrop-blur-sm">
        <button
          className="Button bg-opacity-50 rounded-full bg-white px-4 py-2 font-semibold drop-shadow-lg backdrop-blur-sm hover:bg-[#005B97] hover:text-white"
          value="All"
          onClick={handleClickSortAll}
        >
          ALL
        </button>
        <button
          className="Button bg-opacity-50 rounded-full bg-white px-4 py-2 font-semibold drop-shadow-lg backdrop-blur-sm hover:bg-[#005B97] hover:text-white"
          value="Running"
          onClick={handleClickSortRun}
        >
          RUN
        </button>
        <button
          className="Button bg-opacity-50 rounded-full bg-white px-4 py-2 font-semibold drop-shadow-lg backdrop-blur-sm hover:bg-[#005B97] hover:text-white"
          value="Swimming"
          onClick={handleClickSortSwim}
        >
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown relative inline-block">
            <div className="bg-opacity-50 inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-black drop-shadow-lg backdrop-blur-sm hover:bg-[#005B97] hover:text-white">
              <button className="mr-1" value="Bike">
                Other
              </button>
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </div>

            <div className="dropdown-menu absolute hidden pt-1 text-gray-700">
              <button
                className="whitespace-no-wrap block w-[150px] bg-white px-4 py-2 hover:bg-gray-400"
                value="Weight training"
                onClick={handleClickSortOther}
              >
                Weight training
              </button>
              <button
                className="whitespace-no-wrap block w-[150px] bg-white px-4 py-2 hover:bg-gray-400"
                value="Cycling"
                onClick={handleClickSortOther}
              >
                Cycling
              </button>
              <button
                className="whitespace-no-wrap block w-[150px] rounded-b bg-white px-4 py-2 hover:bg-gray-400"
                value="Walking"
                onClick={handleClickSortOther}
              >
                Walking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
