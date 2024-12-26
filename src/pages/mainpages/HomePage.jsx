import React, { useRef } from "react";
import Features from "../../components/utility/Features";
import Pricing from "../../components/utility/Pricing";
import SubscribeBar from "../../components/utility/SubscribeBar";
import Testimonials from "../../components/utility/Testimonials/Testimonials";
import Statistic from "./Statistic";
import BlogHomePage from "./BlogHomePage";

const HomePage = () => {
  const targetSectionRef = useRef(null);

  const handleScroll = () => {
    targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="text-gray-600 body-font bg-gradient-to-b from-white to-white-800 bg-[#f8f8f8] ">
        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center lg:px-44 ">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0  text-center">
            <h1 className="title-font text-3xl lg:text-5xl mb-5 font-medium text-gray-900 m-14 lg:m-0 md:m-0 lg:mb-5 md:mb-5">
              Welcome to Your Personal Blogging Space!
              {/* <br className="hidden lg:inline-block" />readymade gluten */}
            </h1>
            <p className="mb-8 leading-relaxed">
              Share your ideas, tell your story, and connect with a community of
              like-minded individuals. Start your blogging journey today!.
            </p>
            <div className="flex justify-center">
              <button
                className="inline-flex text-white bg-[#f53855] border-0 px-12 py-5 focus:outline-none hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)] hover:bg-[#f53855] rounded text-lg font-semibold"
                onClick={handleScroll}
              >
                Explore Now
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-screen  ">
            <img
              className="object-cover object-center rounded   lg:h-[700px]"
              alt="hero"
              src={require("../../assets/images/homepage/firstImage.png")}
            />
          </div>
        </div>
        {/* <Statistic /> */}
        <section ref={targetSectionRef}>
          <BlogHomePage />
        </section>
        {/* <Features /> */}
        <Testimonials />
        <div className="price-sec bg-gradient-to-t from-white to-transparent -mb-24 pb-20">
          {/* <Pricing /> */}
        </div>
        <SubscribeBar />
      </section>
    </>
  );
};

export default HomePage;
