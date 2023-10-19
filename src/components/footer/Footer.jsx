import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

function Footer() {
  let [number, setNumber] = useState(1);
  const pages = [{ page: number }, { page: number + 1 }, { page: number + 2 }];

  const Next = () => {
    setNumber(++number);
  };

  const Back = () => {
    number > 1 && setNumber(--number);
  };

  return (
    <div className="flex justify-center items-center w-[100%] mb-5">
      <button
        onClick={Back}
        className="bg-white bg-opacity-50 backdrop-blur-xl rounded-l-lg border-r-0 flex content-center justify-center h-12 border-2 w-12
      hover:bg-[#f08080] hover:text-white"
      >
        <FiChevronLeft className="w-4 h-4 mt-3" />
      </button>
      {pages.map((page, index) => {
        if (page.page === number) {
          return (
            <button
              key={index}
              className="bg-white bg-opacity-50 backdrop-blur-xl h-12 border-2 border-r-0 w-12"
            >
              {page.page}
            </button>
          );
        } else {
          return (
            <button
              key={index}
              className="bg-white bg-opacity-50 backdrop-blur-xl h-12 border-2 border-r-0 w-12"
            >
              {page.page}
            </button>
          );
        }
      })}
      <button
        onClick={Next}
        className="bg-white bg-opacity-50 backdrop-blur-xl rounded-r-lg flex content-center justify-center h-12 border-2 border-r-2 w-12
      hover:bg-[#f08080] hover:text-white"
      >
        <FiChevronRight className="w-4 h-4 mt-3" />
      </button>
    </div>
  );
}

export default Footer;
