import React, { FormEvent } from "react";
import "./password-reset.css";

const Passwordreset: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Password reset form submitted");
  };

  return (
    <div className="passwordReset relative sm:h-screen">
      <div className="flex h-[100vh] flex-col items-center justify-center sm:pt-16">
        <div className="flex max-w-5xl flex-col justify-center mobile:m-10 sm:flex-row">
          <img
            className="object-cover shadow-md sm:max-w-[200px] sm:rounded-l-xl md:max-w-sm lg:max-w-lg xl:max-w-xl"
            src="/imagecard2.jpg"
            alt="imagecard"
          />
          <form
            className="flex flex-col justify-center bg-white px-5 py-5 shadow-md sm:rounded-r-xl md:max-w-[250px] xl:max-w-[350px]"
            onSubmit={handleSubmit}
          >
            <div className="mb-10 flex text-2xl font-bold text-gray-700">
              Password Reset
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                className="appearance-non focus:shadow-outline mb-3 w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="new-password"
                type="password"
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
                Please choose a password.
              </p>
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="confirm-password"
              >
                Confirm New Password
              </label>
              <input
                className="appearance-non focus:shadow-outline mb-3 w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="confirm-password"
                type="password"
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between align-middle">
              <button
                className="focus:shadow-outline w-full rounded bg-[#E4665F] py-2 font-bold text-white hover:bg-[#EDC8D5] focus:outline-none"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Passwordreset;
