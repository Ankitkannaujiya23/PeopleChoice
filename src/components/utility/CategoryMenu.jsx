import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const CategoryMenu = ({ category, isFromAdmin }) => {
  return (
    <div className="categoryMenu">
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-7 mx-auto flex flex-wrap flex-col">
          <div className="flex mx-auto flex-wrap mb-20">
            <p
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-gray-800 transition-all ${
                category === null
                  ? "text-white bg-[#f53855] rounded-t"
                  : "hover:text-[#f53855]"
              } tracking-wider `}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>{" "}
              <Link to={`${isFromAdmin ? "/adminPanel" : "/blog"}`}>
                ALL POST
              </Link>
            </p>
            <p
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 transition-all  ${
                category === "Movies"
                  ? "text-white bg-[#f53855] rounded-t"
                  : "hover:text-[#f53855]"
              } tracking-wider`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              <Link
                to={`${
                  isFromAdmin
                    ? "/adminPanel?category=Movies"
                    : "/blog?category=Movies"
                }`}
              >
                MOVIES
              </Link>
            </p>
            <p
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 transition-all  ${
                category === "Restaurant"
                  ? "text-white bg-[#f53855] rounded-t"
                  : "hover:text-[#f53855]"
              } tracking-wider`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
              </svg>
              <Link
                to={`${
                  isFromAdmin
                    ? "/adminPanel?category=Restaurant"
                    : "/blog?category=Restaurant"
                }`}
              >
                RESTAURANT
              </Link>
            </p>
            <p
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 transition-all  ${
                category === "Education"
                  ? "text-white bg-[#f53855] rounded-t"
                  : "hover:text-[#f53855]"
              } tracking-wider`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <Link
                to={`${
                  isFromAdmin
                    ? "/adminPanel?category=Education"
                    : "/blog?category=Education"
                }`}
              >
                EDUCATION
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryMenu;
