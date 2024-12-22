import React, { useState, useEffect } from "react";
import ThankYou from "../../components/utility/ThankYou";
import { useFormik } from "formik";
import { contactSchema } from "../../validationSchema/ValidationSchema";

const Contact = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState({});
  const [Section, setSection] = useState("contact");

  // const handleChange = (e) => {
  //     switch (e.target.name) {
  //         case "name": setName(e.target.value);
  //             break;
  //         case "email": setEmail(e.target.value);
  //             break;
  //         case "message": setMessage(e.target.value);
  //             break;
  //     }
  // }
  const submit = () => {
    let goto = true;
    let error = {};
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (Name.trim() === "") {
      error["Name"] = "*Please Enter Name";
      goto = false;
    } else if (!Name.trim().includes(" ")) {
      error["Name"] = "*Please Enter Fullname";
      goto = false;
    }
    if (Email.trim() === "") {
      error.Email = "*Please Enter Email Address";
      goto = false;
    } else if (!emailRegex.test(Email)) {
      error.Email = "*Please Enter Valid Email";
      goto = false;
    }
    if (Message.trim() === "") {
      error["Message"] = "*Please Enter Message";
      goto = false;
    } else if (Message.trim().length < 10) {
      error["Message"] = "*Message is too Short";
      goto = false;
    }
    setError(error);
    if (goto) {
      setSection("thankyou");
    }
  };

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  //here i am destructuring the some methods and values from Formik
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    // here validationSchema is property in formik which use for validation
    validationSchema: contactSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, props) => {
      console.log("values in submit", values);
      setMessage(values.message);
      props.setSubmitting(false);
      props.resetForm();
    },
  });

  console.log("errors :", errors);
  console.log("isvalid", isValid);
  console.log("issubmit", isSubmitting);

  return (
    <>
      <div className="contact">
        <section className="text-gray-800 bg-[#f8f8f8]  body-font relative bg-gradient-to-t from-white to-transparent">
          {Section == "contact" ? (
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">
                  Contact Us
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  You can easily get in touch with us. Your Information will
                  keep safe.
                </p>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-800   py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      {errors.name && touched.name ? (
                        <span className="text-xs text-red-600 text-start">
                          {errors.name}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2  bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-800 py-1  first-letter:px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      {errors.email && touched.email ? (
                        <span className="text-xs text-red-600 text-start">
                          {errors["email"]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="leading-7 text-sm text-gray-800"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none
                                         text-gray-800  py-1  px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      ></textarea>
                      {errors.message && touched.message ? (
                        <span className="text-xs text-red-600 text-start">
                          {errors.message}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      type="button"
                      className={`flex mx-auto text-white ${
                        isValid || isSubmitting
                          ? "bg-[#f53855] hover:bg-[#f53855]"
                          : "bg-[#b9adad] hover:bg-[#a39a9a]"
                      } focus:outline-none hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)] border-0 py-2 px-8 
                                     rounded text-lg`}
                      onClick={handleSubmit}
                      disabled={!isValid || isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                    <p className="text-indigo-400 mb-4">example@email.com</p>
                    {/* <p className="leading-normal my-5">
                      55 Smith St.
                      <br />
                      Saint Cloud, MN 56301
                    </p> */}
                    <span className="inline-flex">
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a className="ml-4 text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a className="ml-4 text-gray-500">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                      </a>
                      <a className="ml-4 text-gray-500">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full p-20">
              <ThankYou name={Name} />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Contact;
