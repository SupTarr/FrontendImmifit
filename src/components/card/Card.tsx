import React from "react";
import axios from "../../api/axios";
import { AxiosRequestConfig } from "axios";
import "./card.css";
import moment from "moment";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";

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
  };
  [key: string]: any;
}

interface CardProps {
  item: ActivityItem;
  setAllUsers: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
  allUsers: ActivityItem[];
  getUsers?: () => void;
}

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Aceess-Control-Allow-Origin": "*",
    withCredentials: true,
  },
};

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Card = ({ item, setAllUsers, allUsers }: CardProps): JSX.Element => {
  const now: Date = new Date(item.end_time);
  const then: Date = new Date(item.start_time);
  const datetime: Date = new Date(item.date);
  const date: string = moment(datetime).format("DD/MM/YYYY");

  console.log(item);
  const duration: number = (now.getTime() - then.getTime()) / 60000;

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation() as unknown as Location & {
    state: LocationState;
  };

  const handleClickEditCard = (): void => {
    const from: string =
      location.state?.from?.pathname || `/form?activity_id=${item.activity_id}`;
    navigate(from, { replace: true });
  };

  const handleDeleteClick = async (): Promise<void> => {
    try {
      const activityId: string = item.activity_id;
      await axios.delete(`/activities/${activityId}`, config);
      const newActivity: ActivityItem[] = allUsers.filter(
        (item) => item.activity_id !== activityId,
      );

      setAllUsers(newActivity);
      console.log(activityId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto flex justify-around">
        <figure className="snip1174 rounded-[40px] hover:bg-white">
          <img
            src={item.img.url}
            alt="imgcard"
            className="block rounded-[40px] border shadow-md hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 sm:mx-auto"
          />
          <figcaption>
            <h5 className="text-md mb-2 font-bold tracking-tight text-black">
              {item.title}
            </h5>
            <div className="grid grid-cols-2">
              <h5 className="mb-2 text-sm tracking-tight text-black">
                <b className="text-sm">Date</b> : {date}
              </h5>
              <h5 className="mb-2 text-sm tracking-tight text-black">
                <b className="text-sm">Duration</b> : {duration} Minutes
              </h5>
            </div>
            <div className="grid">
              <h5 className="mb-2 text-sm tracking-tight text-black">
                <b className="text-sm">Type</b> : {item.activity_type}
              </h5>
            </div>
            <div className="grid">
              <h5 className="mb-2 text-sm tracking-tight text-black">
                <b className="text-sm">Description</b> : {item.description}
              </h5>
            </div>

            <div className="grid grid-cols-3 gap-36">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text"></span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-24">
                <button
                  className="flex justify-center rounded bg-[#F08080] px-10 py-2 font-bold text-white shadow-md hover:bg-[#ff5757] hover:shadow-lg"
                  onClick={handleClickEditCard}
                >
                  Edit
                </button>
                <button
                  className="flex justify-center rounded bg-[#F08080] px-10 py-2 font-bold text-white shadow-md hover:bg-[#ff5757] hover:shadow-lg"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Card;
