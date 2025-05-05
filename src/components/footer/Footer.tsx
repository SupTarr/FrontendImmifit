import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

interface PageItem {
  page: number;
}

const Footer: React.FC = () => {
  let [number, setNumber] = useState<number>(1);
  const pages: PageItem[] = [
    { page: number },
    { page: number + 1 },
    { page: number + 2 },
  ];

  const Next = (): void => {
    setNumber(++number);
  };

  const Back = (): void => {
    number > 1 && setNumber(--number);
  };

  return (
    <div className="mb-5 flex w-[100%] items-center justify-center">
      <button
        onClick={Back}
        className="flex h-12 w-12 content-center justify-center rounded-l-lg border-2 border-r-0 bg-white bg-opacity-50 backdrop-blur-xl hover:bg-[#f08080] hover:text-white"
      >
        <FiChevronLeft className="mt-3 h-4 w-4" />
      </button>
      {pages.map((page, index) => {
        if (page.page === number) {
          return (
            <button
              key={index}
              className="h-12 w-12 border-2 border-r-0 bg-white bg-opacity-50 backdrop-blur-xl"
            >
              {page.page}
            </button>
          );
        } else {
          return (
            <button
              key={index}
              className="h-12 w-12 border-2 border-r-0 bg-white bg-opacity-50 backdrop-blur-xl"
            >
              {page.page}
            </button>
          );
        }
      })}
      <button
        onClick={Next}
        className="flex h-12 w-12 content-center justify-center rounded-r-lg border-2 border-r-2 bg-white bg-opacity-50 backdrop-blur-xl hover:bg-[#f08080] hover:text-white"
      >
        <FiChevronRight className="mt-3 h-4 w-4" />
      </button>
    </div>
  );
};

export default Footer;
