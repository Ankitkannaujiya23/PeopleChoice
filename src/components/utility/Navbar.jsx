import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { CgMenuLeft } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../contextAPI/DataProvider";
import { logout } from "../../utilMethods/commonMethods";

const Navbar = ({ IsLoggedIn, setIsLoggedIn }) => {
  const [NavMenu, setNavMenu] = useState("hidden");
  const [Active, setActive] = useState("1");
  const [IsScroll, setScroll] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();

  const NavToggle = () => {
    if (NavMenu === "hidden") setNavMenu("block");
    else setNavMenu("hidden");
  };

  const { UserDetails } = useContext(DataContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, [Active]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <nav
        className={` body-font lg:px-36 md:px-5 transition-all z-30 bg-white   fixed w-full top-0 ${
          IsScroll ? "drop-shadow-md pt-0" : "pt-4"
        }`}
      >
        <div className="hidden lg:container mx-auto md:flex lg:flex xl:flex  lg:p-3 md:p-2  md:flex-row lg:justify-between md:justify-between md:items-center">
          <a className="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0">
            {/* <img src={require('../../assets/images/homepage/logo.png')} alt="Logo" className='w-[45px] ' /> */}
            <span className="ml-3 text-xl text-indigo-500">People👌Choice</span>
          </a>
          <ul className="  md:flex  lg:flex flex-wrap items-center md:text-sm lg:text-lg  text-black  space-x-8 cursor-pointer">
            <li
              className={`hover:text-[#f53855] transition cursor-pointer ml-4   ${
                location.pathname === "/dashboard"
                  ? "text-[#f53855] font-medium"
                  : ""
              }`}
            >
              {" "}
              <Link to="/dashboard">Home</Link>
            </li>
            {IsLoggedIn && (
              <li
                className={`hover:text-[#f53855] transition cursor-pointer text-black-500  ${
                  location?.pathname === "/adminPanel"
                    ? "text-[#f53855] font-medium"
                    : ""
                }`}
              >
                {" "}
                <Link to="/adminPanel">Admin Dashboard </Link>
              </li>
            )}
            <li
              className={`hover:text-[#f53855] transition cursor-pointer  ${
                location.pathname === "/blog"
                  ? "text-[#f53855] font-medium"
                  : ""
              }`}
            >
              <Link to="/blog">Blog</Link>
            </li>
            <li
              className={`hover:text-[#f53855] transition cursor-pointer  ${
                location.pathname === "/about"
                  ? "text-[#f53855] font-medium"
                  : ""
              }`}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`hover:text-[#f53855] transition cursor-pointer  ${
                location.pathname === "/contact"
                  ? "text-[#f53855] font-medium"
                  : ""
              }`}
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {IsLoggedIn ? (
            <button
              className="px-2 font-semibold cursor-pointer"
              onClick={() => handleLogout()}
            >
              Hello {UserDetails?.name} , Logout
            </button>
          ) : (
            <div>
              <button
                className={`px-2 font-semibold cursor-pointer ${
                  location.pathname == "/signup" ? "text-[#f53855]" : ""
                }`}
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
              <button
                className={`inline-block px-8 py-2   font-semibold text-md leading-snug outline outline-1  outline-[#f53855]  rounded-full hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)] hover:bg-[#f53855] hover:text-white  focus:shadow-lg  focus:ring-0  active:shadow-lg transition duration-150 ease-in-out ${
                  location.pathname == "/"
                    ? "bg-[#f53855] text-white"
                    : "text-[#f53855]"
                }`}
                onClick={() => navigate("/")}
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        <div className="navbar-mobile  md:hidden lg:hidden xl:hidden  mx-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="logo-mobile">
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 ">
                {/* <img src={require('../../assets/images/homepage/logo.png')} alt="Logo" className='w-[45px] ' /> */}
                <span className="ml-3 text-xl text-indigo-500 mt-2">
                  People👌Choice
                </span>
              </a>
            </div>

            <div className="nav-icon">
              {NavMenu === "hidden" ? (
                <CgMenuLeft
                  className=" text-2xl transition-all  ease-in-out delay-150 duration-300"
                  onClick={NavToggle}
                />
              ) : (
                <ImCross
                  className="text-2xl transition-all ease-in-out delay-500 duration-300"
                  onClick={NavToggle}
                />
              )}
            </div>
          </div>

          <div className={`mobile-menu ${NavMenu} `}>
            <ul className="items-center text-center    space-y-3 cursor-pointer mb-4">
              <li
                className={`hover:text-[#f53855]-700 cursor-pointer ml-4 ${
                  location.pathname === "/dashboard"
                    ? "text-[#f53855] font-medium"
                    : ""
                }`}
                onClick={() => {
                  setActive("1");
                  setNavMenu("hidden");
                }}
              >
                {" "}
                <Link to="/dashboard">Home</Link>
              </li>
              <li
                className={`hover:text-[#f53855] cursor-pointer transition-all  ${
                  location.pathname === "adminpanel"
                    ? "text-[#f53855] font-medium"
                    : ""
                }`}
                onClick={() => {
                  setActive("2");
                  setNavMenu("hidden");
                }}
              >
                <Link to="/adminPanel">Admin Dashboard </Link>
              </li>
              <li
                className={`hover:text-[#f53855] cursor-pointer  ${
                  Active === "3" ? "text-[#f53855] font-medium" : ""
                }`}
                onClick={() => {
                  setActive("3");
                  setNavMenu("hidden");
                }}
              >
                Features
              </li>
              <li
                className={`hover:text-[#f53855] cursor-pointer  ${
                  location.pathname === "/about"
                    ? "text-[#f53855] font-medium"
                    : ""
                }`}
                onClick={() => {
                  setActive("4");
                  setNavMenu("hidden");
                }}
              >
                <Link to="/about">About</Link>
              </li>
              <li
                className={`hover:text-[#f53855] cursor-pointer  ${
                  location.pathname === "/contact"
                    ? "text-[#f53855] font-medium"
                    : ""
                }`}
                onClick={() => {
                  setActive("5");
                  setNavMenu("hidden");
                }}
              >
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
