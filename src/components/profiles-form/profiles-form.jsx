import React from "react";

function Profileform() {
	return (
		<div className="h-[100%] bg-[#fbc3bc] rounded-xl md:ml-5 tablet:mx-[2.5%]">
			<div className="flex items-end w-[100%] h-[300px] bg-[#5F576C] rounded-t-xl"></div>
			<div className="pt-10">
				<form action="#" method="POST">
					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="file_input"
						>
							Upload Profile
						</label>
						<input
							className="block w-2/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="file_input_help"
							id="profle_pic"
							type="file"
						></input>
						<p
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							SVG, PNG, JPG or GIF (MAX. 800x400px).
						</p>
					</div>

					<div className="py-5">
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="file_input"
						>
							Upload Cover
						</label>
						<input
							className="block w-2/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="file_input_help"
							id="profile_cover"
							type="file"
						></input>
						<p
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							SVG, PNG, JPG or GIF (MAX. 1980x1080px).
						</p>
					</div>

					<div className="py-5">
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="file_input"
						>
							Profile Name
						</label>
						<input
							type="text"
							name="first-name"
							id="first-name"
							autoComplete="given-name"
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-2/4 shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>

					<div>
						<label
							htmlFor="about"
							className="block text-sm font-medium text-gray-700"
						>
							About
						</label>
						<div className="mt-1">
							<textarea
								id="about"
								name="about"
								rows={3}
								className="focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-2/4 sm:text-sm border border-gray-300 rounded-md"
								placeholder="About you"
								defaultValue={""}
							/>
						</div>
						<p className="mt-2 text-sm text-gray-500">
							Brief description for your profile. URLs are hyperlinked.
						</p>
					</div>

					<div className="col-span-6 py-5 sm:col-span-3">
						<label
							htmlFor="country"
							className="block text-sm font-medium text-gray-700"
						>
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							autoComplete="gender"
							className="mt-1 block w-50 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							<option>Male</option>
							<option>Female</option>
							<option>LBGT+</option>
						</select>
					</div>

					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="file_input"
						>
							Age
						</label>
						<input
							type="text"
							name="age"
							id="age"
							autoComplete="your_age"
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-60 shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>


					<div className=" overflow-hidden sm:rounded-md">
						<div className="px-4 py-5 sm:p-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="height"
										className="block text-sm font-medium text-gray-700"
									>
										Height
									</label>
									<input
										type="text"
										name="height"
										id="height"
										autoComplete="your_height"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
								</div>

								<div className="col-span-6 sm:col-span-3">
									<label
										htmlFor="weight"
										className="block text-sm font-medium text-gray-700"
									>
										Weight
									</label>
									<input
										type="text"
										name="weight"
										id="weight"
										autoComplete="your_weight"
										className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>
						</div>
					</div>

					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="bmi"
						>
							BMI
						</label>
						<input
							type="text"
							name="bmi"
							id="bmi"
							autoComplete="bmi"
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/4 shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				
          <div className="px-4 py-4 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                </div>
				</form>
			</div>
		</div>
	);
}

export default Profileform;
