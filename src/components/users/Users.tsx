import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from "react-router-dom";
import { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Define interface for user data
interface User {
  username: string;
  id?: string;
  email?: string;
  roles?: string[];
  [key: string]: any; // For any additional properties
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const axiosPrivate: AxiosInstance = useAxiosPrivate();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // AbortController : cancel our request if the component unmounts
    const controller = new AbortController();

    const getUsers = async (): Promise<void> => {
      try {
        const response: AxiosResponse<User[]> = await axiosPrivate.get(
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
