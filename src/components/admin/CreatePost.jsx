import React, { useState, useEffect, useContext } from "react";
import { MdAddCircle } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../../contextAPI/DataProvider";
import { createPost, fileUpload } from "../../services/apiCalls";
import { getAccessToken } from "../../utilMethods/commonMethods";
import { PhotoIcon } from "@heroicons/react/24/solid";

const CreatePost = () => {
  const [BlogPost, setBlogPost] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    username: "",
    createdDate: new Date(),
  });
  const [File, setFile] = useState("");
  const [searchParams] = useSearchParams();
  const { UserDetails } = useContext(DataContext);
  const [Image, setImage] = useState("");
  const [Error, setError] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select an option");
  const options = ["All", "Education", "Movies", "Restaurant"]; // Dynamically generated options

  let navigate = useNavigate();

  let token = getAccessToken();

  const { setAlertData } = useContext(DataContext);

  useEffect(() => {
    let category = searchParams.get("category");
    category = options.find((row) => row === category);
    setSelectedCategory(category ?? "All");
  }, []);

  useEffect(() => {
    const getImageFile = async () => {
      // here we check the file is present or not
      if (File) {
        // if file presents so we have to append the file in formdata
        let data = new FormData();
        data.append("name", File.name);
        data.append("file", File);
        //APi Call for image send data into this api as body
        let fileData = await fileUpload("file/upload", data);
        console.log(fileData);
        setImage(fileData.imageURL);
        BlogPost.image = fileData.imageURL;
      }
    };
    getImageFile();
    BlogPost.category = selectedCategory;
    BlogPost.username = UserDetails.name;
  }, [File]);

  const handleChange = (e) => {
    setBlogPost({ ...BlogPost, [e.target.name]: e.target.value });
  };

  const addBlogPost = async () => {
    let goto = true;
    let error = {};
    if (BlogPost.title === "") {
      error["title"] = "Please write title of the blog";
      goto = false;
    }
    if (BlogPost.description === "") {
      error["description"] = "Please write description of the blog";
      goto = false;
    }
    if (BlogPost.image === "") {
      error["image"] = "Please upload image for the blog";
      goto = false;
    }
    setError(error);
    if (goto) {
      let response = await createPost(
        "blogPostController/createPost",
        BlogPost,
        token
      );
      if (response?.statusCode === 200) {
        setAlertData({
          IsShow: true,
          Status: response.statusCode,
          Message: response.message,
        });
        navigate("/adminpanel");
      } else {
        setAlertData({
          IsShow: true,
          Status: response.statusCode,
          Message: response.message,
        });
      }
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    //BlogPost.category = option;
    setBlogPost({ ...BlogPost, category: option });
    setSelectedCategory(option);
    setIsOpen(false);
  };
  return (
    <div className="createPost">
      {/* <div className="wrapper lg:py-28 md:py-28 py-24 lg:px-40 px-2 ">
                <div className="imageSection h-80    bg-origin-content p-4 border-4 border-dashed ">
                    <img src={Image ? Image : NoImage} className='w-full  h-full' alt="" />
                </div>
                <span className='text-sm text-red-600'>{Error.image}</span>
                <div className=" actionSection flex  mt-4 justify-between">
                    <div className="actionBody flex items-center space-x-2">

                        <label htmlFor='fileImage'>
                            <MdAddCircle className='text-3xl cursor-pointer text-gray-700' />
                            <input type="file" className='hidden' name="file" id="fileImage" onChange={(e) => setFile(e.target.files[0])} />

                        </label>
                        
                    </div>
                    <div className="input-field w-full">
                        <input type="text" name='title' placeholder='Enter your title' className='text-xl lg:w-[1025px] md:w-[350px] bottom-1 w-full border-b-2 outline-none text-gray-700' onChange={handleChange} />
                        <span className='text-sm text-red-600'>{Error.title}</span>
                        </div>
                </div>
                <div className="description lg:pr-32 mt-4">
                    <textarea name="description" id="" cols="30" rows="10" placeholder='Enter your Message' className='border w-full p-4 outline-none text-gray-700' onChange={handleChange}></textarea>
                    <span className='text-sm text-red-600'>{Error.description}</span>
                </div>
                
                <div className='publish mt-2'>
                        <button className="inline-flex items-center cursor-pointer border-[#f53855] border-2 text-[#f53855] text-lg  hover:bg-[#f53855] hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)]  py-1 px-3 hover:text-white focus:outline-none  rounded   md:mt-0" onClick={() => addBlogPost()}>Publish
                            <MdAddCircle className='mx-2 text-2xl' />
                        </button>


                    </div>
            </div> */}
      <div className="wrapper lg:py-28 md:py-28 py-24 lg:px-40 px-2 ">
        <>
          <div className="space-x-6 w-3/4">
            <div className=" border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Add Blog :
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Blog Thumbnail
                  </label>
                  <div className="w-3/4 my-5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
                    <div className="text-center h-40">
                      {!Image ? (
                        <PhotoIcon
                          aria-hidden="true"
                          className="h-full max-h-96 text-gray-300 "
                        />
                      ) : (
                        <img src={Image} className="h-full max-h-96 " alt="" />
                      )}
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="fileImage"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="fileImage"
                            onChange={(e) => setFile(e.target.files[0])}
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <span className="text-sm text-red-600">
                        {Error.image}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-5 w-3/4">
              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      name="title"
                      placeholder="Enter your title"
                      type="text"
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-sm text-red-600">{Error.title}</span>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Select Category
                  </label>
                  <div className="mt-2">
                    <div className="relative inline-block text-left">
                      {/* Dropdown Button */}
                      <button
                        onClick={() => toggleDropdown()}
                        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      >
                        {selectedCategory}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                                  selectedCategory === option
                                    ? "bg-gray-200 font-semibold"
                                    : ""
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      cols="30"
                      rows="5"
                      autoComplete="email"
                      onChange={handleChange}
                      placeholder="Enter your Message"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></textarea>

                    <span className="text-sm text-red-600">
                      {Error.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>

              <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  By email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultChecked
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p id="comments-description" className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          aria-describedby="candidates-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p id="candidates-description" className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          aria-describedby="offers-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p id="offers-description" className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">
                  Push notifications
                </legend>
                <p className="mt-1 text-sm/6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      defaultChecked
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            </div> */}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 w-3/4">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center cursor-pointer border-[#f53855] border-2 text-[#f53855] text-lg  hover:bg-[#f53855] hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)]  py-1 px-3 hover:text-white focus:outline-none  rounded   md:mt-0"
              onClick={() => addBlogPost()}
            >
              Publish
              <MdAddCircle className="mx-2 text-2xl" />
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default CreatePost;
