import React, { useEffect, useState } from "react";
import axios from "axios";
import "./container.css";
import Card from "../card/Card";
import Header from "../header/Header";
import FormDetail from "../form-component/FormDetail";

// Interface for Activity, matching the one in Card.tsx
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

// Interface for Container component props
interface ContainerProps {
  username: string;
  newActivity?: ActivityItem[];
}

const Container = (props: ContainerProps): JSX.Element => {
  // const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState<ActivityItem[]>([]);

  async function getUsers(): Promise<void> {
    try {
      const response = await fetch(
        `https://immifit-backend.vercel.app/activities/${props.username}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        },
      );
      const data: ActivityItem[] = await response.json();
      console.log(data);
      setAllUsers(data);
      // setUsers(data)
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [props.username]); // Added props.username as dependency to reflect changes when username changes

  // Commented code kept for reference, properly typed
  /*
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  
  const updateActivity = async (id: string): Promise<void> => {
    try {
      const idx = activities.findIndex((activity) => activity._id === id);
      const newActivity = [...activities];

      let updateData = {
        img: {
          name: selectedImgFile.name,
        },
        title: title,
        activity_type: type,
        date: date,
        start_time: new Date(`${date} ${startTime}`),
        end_time: new Date(`${date} ${endTime}`),
        description: description,
      };

      const res = await axios.put(`/activity_id/${id}`, updateData);
      newActivity[idx] = res.data;
      setActivities(newActivity);
      getUsers();
    } catch (e) {
      console.log(e);
    }
  };
  */

  return (
    <div>
      <div className="w-[100%] mx-auto flex justify-center">
        <Header
          allUsers={allUsers}
          getUsers={getUsers}
          setAllUsers={setAllUsers}
        />
      </div>

      {/* ✅ check if array before calling `map()` */}
      <div className="flex flex-wrap justify-center">
        {Array.isArray(allUsers)
          ? allUsers.map((item, index) => (
              <Card
                key={index}
                item={item}
                setAllUsers={setAllUsers}
                allUsers={allUsers}
                getUsers={getUsers}
              />
            ))
          : console.log("no data")}
      </div>
    </div>
  );
};

export default Container;

