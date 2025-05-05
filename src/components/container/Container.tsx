import { useEffect, useState } from "react";
import "./container.css";
import Card from "../card/Card";
import Header from "../header/Header";

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

interface ContainerProps {
  username: string;
  newActivity?: ActivityItem[];
}

const Container = (props: ContainerProps): JSX.Element => {
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
      <div className="mx-auto flex w-[100%] justify-center">
        <Header
          allUsers={allUsers}
          getUsers={getUsers}
          setAllUsers={setAllUsers}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers.map((item, index) => (
            <Card
              key={index}
              item={item}
              setAllUsers={setAllUsers}
              allUsers={allUsers}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Container;
