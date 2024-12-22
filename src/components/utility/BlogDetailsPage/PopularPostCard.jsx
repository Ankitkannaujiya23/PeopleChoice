import React from "react";
import { addElipsis } from "../../../utilMethods/commonMethods";
import { Link } from "react-router-dom";

const PopularPostCard = ({ post }) => {
  return (
    <div>
        <Link to={`/blogDetails/${post._id}`}>
      <div className="flex items-center border-b-2 m-2 p-4">
          <div className="img-sec ">
            <img
              src={post.image}
              className="w-32 h-28 rounded-md"
              alt="blog image"
            />
          </div>
          <div className="text-sec mx-2">
            <p className="text-gray-700 text-lg">
              {addElipsis(post.title, 30)}
            </p>
            <p className="text-gray-500">{addElipsis(post.description, 30)}</p>
          </div>
      </div>
        </Link>
    </div>
  );
};

export default PopularPostCard;
