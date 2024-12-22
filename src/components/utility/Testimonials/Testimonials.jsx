import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import {
  BsArrowLeft,
  BsArrowLeftCircle,
  BsArrowRight,
  BsArrowRightCircle,
} from "react-icons/bs";
import { testimonialData } from "./testimonialData";

const Testimonials = () => {
  const testimonials = testimonialData;

  //get slider container width
  let slider;
  useEffect(() => {
    slider = document.querySelector(".slider-container");
  }, []);
  const slideNext = () => {
    let width = slider.clientWidth;
    slider.scrollLeft = slider.scrollLeft + width;
  };
  const slidPrev = () => {
    let width = slider.clientWidth;
    slider.scrollLeft = slider.scrollLeft - width;
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto lg:px-44 overflow-hidden">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
            Testimonials
          </h1>
          <div className=" slider-container flex flex-row -m-4  w-auto overflow-x-hidden transition-all scroll-smooth duration-500">
            {testimonials.map((data) => (
              <div className="p-4 min-w-[300px] max-w-[300px] ">
                <TestimonialCard data={data} />
              </div>
            ))}
          </div>
          <div className="slidershow flex justify-between mt-12">
            <div className="">
              <div className="p-2 rounded-full bg-red-500"></div>
            </div>
            <div className="slide-button flex space-x-4">
              <div
                className="p-4 outline outline-1 rounded-full cursor-pointer text-[#f53855] hover:text-white hover:bg-[#f53855] "
                onClick={slideNext}
              >
                {" "}
                <BsArrowLeft className=" text-2xl  " />
              </div>
              <div
                className="p-4 outline outline-1 rounded-full cursor-pointer text-[#f53855] hover:text-white hover:bg-[#f53855] "
                onClick={slidPrev}
              >
                {" "}
                <BsArrowRight className=" text-2xl  " />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
