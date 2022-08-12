import React from "react";
import "./forget-password.css";

const Forgetpassword = () => {
	return (
		<div className="forgetPassword relative sm:h-screen">
			<div className="flex flex-col justify-center items-center sm:pt-16 h-[100vh]">
				<div className="max-w-5xl flex flex-col justify-center sm:flex-row mobile:m-10">
					<img
						className="shadow-md sm:rounded-l-xl object-cover  sm:max-w-[200px] md:max-w-sm lg:max-w-lg xl:max-w-xl"
						src="../../public/imagecard2.jpg"
						alt="imagecard"
					></img>
					<form className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5">
						<div className="flex text-gray-700 text-2xl font-bold mb-10">
							Forget Password
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								for="username"
							>
								Email
							</label>
							<input
								className="shadow appearance-none border-b border-[#32312d] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="example@lmmifit.com"
							/>
						</div>
						<div className="flex items-center justify-between align-middle">
							<button
								className="bg-[#E4665F] hover:bg-[#EDC8D5] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline"
								type="button"
							>
								Send Confirmation Email
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Forgetpassword;
