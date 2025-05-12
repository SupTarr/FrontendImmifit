import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";
import useAuth from "../../hooks/useAuth";
import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from "react-router-dom";
import { AuthState } from "../../context/AuthProvider";

interface ProfileData {
  username: string;
  about: string;
  gender: string;
  age: string | number;
  height: string | number;
  weight: string | number;
  bmi: string | number;
}

interface ProfileResponse {
  profile: {
    about?: string;
    gender?: string;
    age?: string | number;
    height?: string | number;
    weight?: string | number;
    bmi?: string | number;
    [key: string]: any;
  };
  [key: string]: any;
}

interface FormErrors {
  about?: string;
  age?: string;
  height?: string;
  weight?: string;
  [key: string]: string | undefined;
}

interface FormValues {
  about: string;
  gender: string;
  age: string | number;
  height: string | number;
  weight: string | number;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Profileform: React.FC = () => {
  const { auth } = useAuth() as { auth: AuthState };
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation() as Location & { state: LocationState };
  const from: string = location.state?.from?.pathname || "/";

  const [about, setAbout] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  console.log(about, gender, age, height, weight, bmi);

  useEffect(() => {
    axios
      .get<ProfileResponse>(`/users/${auth.user_id}`)
      .then((res: AxiosResponse<ProfileResponse>) => {
        setAbout(res.data.profile?.about || "");
        setGender(res.data.profile?.gender || "Male");
        setAge(res.data.profile?.age?.toString() || "");
        setHeight(res.data.profile?.height?.toString() || "");
        setWeight(res.data.profile?.weight?.toString() || "");
        setBmi(res.data.profile?.bmi?.toString() || "");
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [auth.user_id]);

  const onChangeAbout = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setAbout(e.target.value);
  };

  const onChangeGender = (e: ChangeEvent<HTMLSelectElement>): void => {
    setGender(e.target.value);
  };

  const onChangeAge = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 150) {
      setAge(e.target.value);
    }
  };

  const onChangeHeight = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 300) {
      setHeight(e.target.value);
    }
  };

  const onChangeWeight = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 200) {
      setWeight(e.target.value);
    }
  };

  useEffect(() => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    if (heightNum > 0 && weightNum > 0) {
      const bmiValue = Math.round(weightNum / (heightNum / 100) ** 2);
      setBmi(bmiValue.toString());
    }
  }, [weight, height]);

  useEffect(() => {
    setFormErrors(validate({ about, gender, age, height, weight }));
  }, [about, gender, age, height, weight]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (about && gender && age && height && weight) {
      const profile: ProfileData = {
        username: auth.user || "",
        about: about,
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        bmi: bmi,
      };

      try {
        await axios.post(`/users/profile`, profile);
        setAbout("");
        setGender("Male");
        setAge("");
        setHeight("");
        setWeight("");
        setBmi("");
        navigate(from, { replace: true });
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.about) {
      errors.about = "About is required!";
    }
    if (!values.age) {
      errors.age = "Age is required! and between 1-150";
    }
    if (!values.height) {
      errors.height = "Height is required and between 1-300";
    }
    if (!values.weight) {
      errors.weight = "Weight is required and between 1-200";
    }
    return errors;
  };

  return (
    <div className="mx-auto my-5 h-[100%] w-[100%] rounded-xl bg-[#fbc3bc]">
      <div className="mx-auto ml-5 pt-10">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-bold text-gray-700"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={4}
                cols={10}
                onChange={onChangeAbout}
                value={about}
                className="mt-1 block w-[75%] resize-none rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Brief description for your profile"
                white-space="pre"
                word-wrap="break-word"
              />
            </div>
            <p className="mt-3 font-bold text-red-700">{formErrors.about}</p>
          </div>

          <div className="col-span-6 py-5 sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-bold text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              autoComplete="gender"
              onChange={onChangeGender}
              value={gender}
              className="mt-1 block w-[150px] rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option>Male</option>
              <option>Female</option>
              <option>LBGT+</option>
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-bold text-gray-900"
              htmlFor="file_input"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              min="1"
              max="150"
              autoComplete="your_age"
              placeholder="Years"
              value={age}
              onChange={onChangeAge}
              className="mt-1 block w-[150px] rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <p className="mt-3 font-bold text-red-700">{formErrors.age}</p>
          </div>

          <div className="overflow-hidden sm:rounded-md">
            <div className="py-5">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="height"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    min="1"
                    max="300"
                    placeholder="Centimeters"
                    value={height}
                    onChange={onChangeHeight}
                    className="mt-1 block w-[150px] rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-3 font-bold text-red-700">
                    {formErrors.height}
                  </p>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-bold text-gray-700"
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    min="1"
                    max="200"
                    placeholder="Kilograms"
                    value={weight}
                    onChange={onChangeWeight}
                    className="mt-1 block w-[150px] rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-3 font-bold text-red-700">
                    {formErrors.weight}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-bold text-gray-900"
              htmlFor="bmi"
            >
              BMI
            </label>
            <p className="text-gray-700">{bmi}</p>
          </div>

          <div className="px-4 py-4 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-[#F08080] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#ff5757]"
              disabled={
                formErrors.about ||
                formErrors.age ||
                formErrors.weight ||
                formErrors.weight
                  ? true
                  : false
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profileform;
