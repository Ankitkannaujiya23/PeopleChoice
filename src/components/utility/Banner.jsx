import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../contextAPI/DataProvider";

const Banner = (props) => {
  const { UserDetails } = useContext(DataContext);

  return (
    <div className="banner">
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container flex flex-wrap">
          <div className="lg:w-screen mx-auto">
            <div className="flex flex-wrap w-full bg-gray-800 py-32 px-10 relative">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                src={require("../../assets/images/blogPost/blog-bg1.jpg")}
              />
              <div className="text-center relative z-10 w-full">
                <h2 className="text-3xl text-white font-medium title-font mb-2">
                  Welcome, {UserDetails?.name}
                </h2>
                <p className="leading-relaxed mb-7 text-gray-300">
                Keep up the great work, Let's make today productive.
                </p>
                <Link
                  to={`/createPost?category=${props.category || "All"}`}
                  className="inline-flex items-center cursor-pointer bg-gray-200 border-0 py-1 px-3 text-blue-700 focus:outline-none hover:bg-gray-100 rounded text-base  md:mt-0"
                >
                  Create Post
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
