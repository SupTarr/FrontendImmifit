import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, NavigateFunction, Location } from "react-router-dom";

// Define interfaces
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
    [key: string]: any; // For any additional properties
  };
  [key: string]: any; // For any additional properties
}

interface FormErrors {
  about?: string;
  age?: string;
  height?: string;
  weight?: string;
  [key: string]: string | undefined;
}

interface AuthState {
  user: string;
  user_id: string;
  accessToken?: string;
  // Add other auth properties as needed
}

interface FormValues {
  about: string;
  gender: string;
  age: string | number;
  height: string | number;
  weight: string | number;
}

const Profileform: React.FC = () => {
  const { auth } = useAuth() as { auth: AuthState };
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
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
    axios.get<ProfileResponse>(`/users/${auth.user_id}`)
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
        username: auth.user,
        about: about,
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        bmi: bmi,
      };
      
      try {
        await axios.post(`/users/profile`, profile);
        // Reset form
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
    <div className="h-[100%] w-[100%] mx-auto bg-[#fbc3bc] rounded-xl my-5">
      {/* <div className="flex items-end w-[100%] h-[300px] mx-auto bg-[#5F576C] rounded-t-xl"></div> */}
      <div className="pt-10 ml-5 mx-auto">
        <form onSubmit={handleSubmit}>
          {/* <div >
						<label
							className="block mb-2 text-sm font-medium text-gray-900"
							htmlFor="file_input"
						>
							Upload Profile
						</label>
						<input
							className="block w-[75%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="file_input_help"
							id="profle_pic"
							type="file"
						></input>
						<p
							className="mt-1 text-sm text-gray-500"
							id="file_input_help"
						>
							SVG, PNG, JPG or GIF (MAX. 800x400px).
						</p>
					</div>

					<div className="py-5">
						<label
							className="block mb-2 text-sm font-medium text-gray-900"
							htmlFor="file_input"
						>
							Upload Cover
						</label>
						<input
							className="block w-[75%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="file_input_help"
							id="profile_cover"
							type="file"
						></input>
						<p
							className="mt-1 text-sm text-gray-500"
							id="file_input_help"
						>
							SVG, PNG, JPG or GIF (MAX. 1980x1080px).
						</p>
					</div> */}

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
                rows="4"
                cols="10"
                onChange={onChangeAbout}
                value={about}
                className="focus:ring-indigo-500 py-2 px-3 focus:border-indigo-500 mt-1 block w-[75%] sm:text-sm border border-gray-300 rounded-md resize-none"
                placeholder="Brief description for your profile"
                white-space="pre"
                word-wrap="break-word"
              />
            </div>
            <p className="text-red-700 font-bold mt-3">{formErrors.about}</p>
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
              className="mt-1 block w-[150px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Male</option>
              <option>Female</option>
              <option>LBGT+</option>
            </select>
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-900"
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
              className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-[150px] shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <p className="text-red-700 font-bold mt-3">{formErrors.age}</p>
          </div>

          <div className=" overflow-hidden sm:rounded-md">
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
                    className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-[150px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="text-red-700 font-bold mt-3">
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
                    className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-[150px] shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="text-red-700 font-bold mt-3">
                    {formErrors.weight}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-bold text-gray-900"
              htmlFor="bmi"
            >
              BMI
            </label>
            <p className="text-gray-700">{bmi}</p>
          </div>

          <div className="px-4 py-4 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#F08080] hover:bg-[#ff5757]"
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
