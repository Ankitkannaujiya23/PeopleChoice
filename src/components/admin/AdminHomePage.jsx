import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAllPost } from "../../services/apiCalls";
import Banner from "../utility/Banner";
import CategoryCard from "../utility/CategoryCard";
import CategoryMenu from "../utility/CategoryMenu";
import { getAccessToken } from "../../utilMethods/commonMethods";

const AdminHomePage = () => {
  const [AllPost, setAllPost] = useState([]);
  const [IsLoader, setLoader] = useState(true);

  const [searchParams] = useSearchParams();
  let category = searchParams.get("category");
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
      console.log(response.data);
      setAllPost(response.data);
      setLoader(false);
    };
    getAllPost();
  }, [category]);

  return (
    <div className="admin-home-page bg-[#f8f8f8] bg-gradient-to-t from-white to-transparent mb-24">
      <section className="banner relative">
        <Banner category={category} />
        <div className="categorySection m-auto  flex justify-center">
          <div className="menuHeading w-52  absolute -m-8">
            <h1 className="text-2xl text-white bg-gray-900 text-center">
              Category Filter
            </h1>
          </div>
          <CategoryMenu isFromAdmin={true} category={category} />
        </div>
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
      </section>
    </div>
  );
};

export default AdminHomePage;
