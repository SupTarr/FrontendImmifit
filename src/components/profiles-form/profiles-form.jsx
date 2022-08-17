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
							className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

					<div>
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							for="file_input"
						>
							Upload Cover
						</label>
						<input
							className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

          <div>
            <label></label>
          </div>
				</form>
			</div>
		</div>
	);
}

export default Profileform;
