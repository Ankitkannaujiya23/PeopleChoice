import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../utilMethods/commonMethods";
import { fetchAllPost } from "../../services/apiCalls";
import CategoryCard from "../../components/utility/CategoryCard";
import CategoryMenu from "../../components/utility/CategoryMenu";

const BlogHomePage = () => {
  const [AllPost, setAllPost] = useState([]);
  const [IsLoader, setLoader] = useState(true);

  const [searchParams] = useSearchParams();
  let category = searchParams.get("category");
  let navigate = useNavigate();
  console.log("cate", category);

  useEffect(() => {
    const getAllPost = async () => {
      let token = getAccessToken();
      let response;

      response = await fetchAllPost(
        "blogPostController/fetchAllPost",
        `${category !== null ? category : ""}`,
        token
      );
      // console.log(response.data);
      setAllPost(response.data);
      setLoader(false);
    };
    getAllPost();
  }, [category]);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              ROOF PARTY POLAROID
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Master Cleanse Reliac Heirloom
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom prism
              food truck ugh squid celiac humblebrag.
            </p>
          </div> */}
          <CategoryMenu category={category} isFromAdmin={false} />
          <div className="flex flex-wrap">
            <div className="blogList">
              <section className="text-gray-400  body-font">
                <div className="container lg:px-24 md:px-24 px-3  mx-auto">
                  {IsLoader ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:-m-4 md:-m-4 m-0  w-full">
                      {AllPost.map((data, i) => (
                        <CategoryCard Blog={data} key={i} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogHomePage;
