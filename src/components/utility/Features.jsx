import React from "react";

const Features = () => {
  return (
    <div>
      <section className="text-gray-600 body-font bg-gradient-to-t from-white to-transparent lg:px-44">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col ">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={require("../../assets/images/homepage/feature.png")}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-32 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Empowering Creativity with Our Blog App
            </h1>
            <p>
              Our platform offers an intuitive and feature-rich environment for
              bloggers to share their ideas, connect with readers, and create
              stunning content effortlessly.
            </p>
            <div className="flex justify-center mt-4">
              <div className="key-features flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
                <a className="hover:scale-125 transition">
                  <span className="  bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Easy Blog Creation
                </a>
                <a className="hover:scale-125 transition-all ">
                  <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Personalized Dashboard
                </a>
                <a className="hover:scale-125 transition-all">
                  <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Interactive Reader Engagement
                </a>
                <a className="hover:scale-125 transition">
                  <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Search and Categorization
                </a>
                <a className="hover:scale-125 transition-all">
                  <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Secure Login and Signup
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
