import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "@/api/axios";

interface User {
  username: string;
  id?: string;
  email?: string;
  roles?: string[];
  [key: string]: any;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<User[]> = await axiosInstance.get(
          "/users",
          {
            signal: controller.signal,
          },
        );
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        const error = err as AxiosError;
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
