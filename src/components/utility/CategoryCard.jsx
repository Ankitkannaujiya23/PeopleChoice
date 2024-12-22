import React from "react";
import { Link } from "react-router-dom";
import { addElipsis } from "../../utilMethods/commonMethods";

const CategoryCard = (props) => {
  console.log({props});
  
  return (
    <div className="CategoryCard">
      <div className="p-4 ">
        <div className="h-full shadow-xl rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full  object-center"
            src={props.Blog.image}
            alt="blog"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-[#f53855] mb-1">
              {props.Blog.category}
            </h2>
            <h1 className="title-font text-lg font-medium text-black mb-3">
              {addElipsis(props.Blog.title, 20)}
            </h1>
            <p className="leading-relaxed mb-3 text-gray-700">
              {addElipsis(props.Blog.description, 30)}
            </p>
            <div className=" items-center flex-wrap ">
              <Link
                className="text-blue-400 inline-flex items-center md:mb-2 lg:mb-0"
                to={`/blogDetails/${props.Blog._id}`}
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                {props.Blog.username}
              </span>
              <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
                {props?.Blog?.__v+1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
