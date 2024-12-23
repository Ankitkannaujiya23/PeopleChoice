//import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AnimatedAlertBox from "../../components/utility/AnimatedAlertBox";
import { userSignUp, baseURL } from "../../services/apiCalls";
const Signup = () => {
  const [InputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Data, setData] = useState(null);
  const [Error, setError] = useState({});
  const [BtnVal, setBtnVal] = useState("Create Account");
  const [AlertData, setAlertData] = useState({
    IsShow: false,
    Status: 0,
    Message: "",
  });
  const [IsShowAlert, setShowAlert] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setInputData({ ...InputData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    let goto = true;
    let error = {};
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (InputData.name === "") {
      goto = false;
      error["name"] = "*Enter Fullname";
    }
    if (InputData.email === "") {
      goto = false;
      error["email"] = "*Enter Email address";
    } else if (!emailRegex.test(InputData.email)) {
      goto = false;
      error["email"] = "*Enter valid Email";
    }
    if (InputData.password === "") {
      goto = false;
      error["password"] = "*Enter Password";
    }
    // else if (InputData.password ) {
    //   goto=false;
    //   error["password"]="*Password is too weak"
    // }
    setError(error);
    if (goto) {
      setBtnVal("wait...");
      let data = await userSignUp(`${baseURL}/signup`, InputData);
      setData(data);
      console.log(data);
      if (data.statusCode === 201) {
        setInputData({ name: "", email: "", password: "" });
        setAlertData({
          IsShow: true,
          Status: data.statusCode,
          Message: data.message,
        });
        setShowAlert(true);
        navigate("/dashboard");
      } else {
        setAlertData({
          IsShow: true,
          Status: data.statusCode,
          Message: data.message,
        });
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    let hideAlert = setTimeout(() => {
      setShowAlert(false);
    }, 5400);
    return () => {
      clearTimeout(hideAlert);
    };
  }, [IsShowAlert]);

  return (
    <div className="signup p-20">
      {IsShowAlert && (
        <AnimatedAlertBox
          Status={AlertData.Status === 201 ? true : false}
          Message={AlertData.Message}
        />
      )}
      <section className="h-screen">
        <div className="px-6 h-[80vh] text-gray-800 lg:px-20">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src={require("../../assets/images/homepage/signupCompress.jpg")}
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:px-20  xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    Create a New Account
                  </p>
                </div>

                <div className="mb-6 lg:mt-11">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Enter Name "
                    name="name"
                    onChange={handleChange}
                  />
                  <span className="text-sm text-red-600">{Error.name}</span>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChange}
                  />
                  <span className="text-sm text-red-600">{Error.email}</span>
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <span className="text-sm text-red-600">{Error.password}</span>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 bg-[#f53855] text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)]  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => handleSignup()}
                  >
                    {BtnVal}
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    have an account ?
                    <Link
                      to="/"
                      className="text-[#f53855] hover:text-red-400  transition duration-200 ease-in-out"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
