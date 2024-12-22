import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import blogImg from "../../assets/images/homepage/hero.jpg";
import {
  deleteBlogPost,
  fetchAllPost,
  getSinglePost,
} from "../../services/apiCalls";
import { FcTimeline } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataContext } from "../../contextAPI/DataProvider";
import CommentBox from "../../components/comments/CommentBox";
import SearchBar from "../../components/utility/BlogDetailsPage/SearchBar";
import PopularPostCard from "../../components/utility/BlogDetailsPage/PopularPostCard";
import CategoryList from "../../components/utility/BlogDetailsPage/CategoryList";
import "../../assets/css/BlogPage.css";
import AnimatedBanner from "../../components/utility/BlogDetailsPage/AnimatedBanner";
import AnimatedAlertBox from "../../components/utility/AnimatedAlertBox";
import { getAccessToken } from "../../utilMethods/commonMethods";

const BlogDetailsPage = (props) => {
  const [Data, setData] = useState({});
  const [IsLoaded, setLoaded] = useState(false);
  const [AllPost, setAllPost] = useState([]);

  const { UserDetails } = useContext(DataContext);
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const getBlogPostById = async () => {
      let response = await getSinglePost(
        `blogPostController/fetchSinglePost/${id}`
      );

      if (
        response !== "" &&
        response !== undefined &&
        response.statusCode === 200
      ) {
        setData(response.data);
        setLoaded(true);
      } else {
        setLoaded(false);
      }
    };
    getBlogPostById();
  }, [id]);

  const deletePost = async () => {
    let response = await deleteBlogPost(
      `blogPostController/deletePost/${Data._id}`
    );
    if (response.statusCode === 200) {
      navigate("/adminpanel");
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    const getAllPost = async () => {
      let token = getAccessToken();
      let response;

      response = await fetchAllPost(
        "blogPostController/fetchAllPost",
        "",
        token
      );
      setAllPost(response.data);
    };
    getAllPost();
  }, []);

  return (
    <div>
      {IsLoaded ? (
        <div className="BlogDetailsPage ">
          <section className="body-font">
            <div className="background-banner relative">
              <AnimatedBanner />
            </div>
            <div className="container px-5  mx-auto flex flex-col">
              <div className="lg:px-16  mx-auto grid grid-cols-12 space-x-3 gap-2">
                <div className=" lg:col-span-8 md:col-span-8 col-span-12">
                  <div className="rounded-lg  overflow-hidden">
                    <img
                      alt="content"
                      className="object-cover object-center h-full w-full"
                      src={Data.image ? Data.image : blogImg}
                    />
                  </div>
                  <div className="   border-gray-800 sm:border-t-0 border-t mt-8 lg:mt-4 md:mt-4   text-center sm:text-left">
                    <div className="category flex items-center justify-between w-full">
                      <div>
                        <span className="text-xl mb-2 flex items-center space-x-2 text-orange-500">
                          <FcTimeline />
                          <span>{Data.category}</span>
                        </span>
                      </div>
                      {UserDetails.name === Data.username && (
                        <div className="actionBar flex space-x-2 text-lg">
                          <Link
                            to={`/updateBlog/${Data._id}`}
                            state={{ post: Data }}
                          >
                            <FaRegEdit className="text-green-600 cursor-pointer" />
                          </Link>
                          <RiDeleteBin6Line
                            className="text-red-500 cursor-pointer"
                            onClick={deletePost}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-3xl mb-2 text-[#262566] font-semibold ">
                      {Data.title}
                    </p>
                    <p className="leading-relaxed text-lg mb-4 text-[#6e6e6e]">
                      {Data.description}
                    </p>
                  </div>
                  <div className="addComment mt-14">
                    <CommentBox Data={Data} />
                  </div>
                </div>
                <div className="lg:col-span-4 col-span-12 space-y-6">
                  <div className="search-sec shadow-md">
                    <p className=" bg-gray-200 border-l-4 border-[#f53855] py-2 text-lg text-black px-2 font-semibold">
                      {" "}
                      Search Now
                    </p>
                    <div className="p-2">
                      <SearchBar />
                    </div>
                  </div>

                  <div className="category-sec shadow-md">
                    <p className=" bg-gray-200 border-l-4 border-[#f53855] py-2 text-lg text-black px-2 font-semibold">
                      {" "}
                      Popular Post
                    </p>
                    <div className="p-2">
                      {AllPost?.length > 0 ? (
                        AllPost?.slice(0, 5)?.map((post) => (
                          <PopularPostCard post={post} />
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="category-sec shadow-md">
                                        <p className=' bg-gray-200 border-l-4 border-[#f53855] py-2 text-lg text-black px-2 font-semibold'> Categoies </p>
                                        <div className="p-2">
                                            <CategoryList />
                                        </div>
                                    </div> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <AnimatedAlertBox />
      )}
    </div>
  );
};

export default BlogDetailsPage;
