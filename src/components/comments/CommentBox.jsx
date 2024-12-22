import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../contextAPI/DataProvider";
import {
  addNewComment,
  deleteCommentById,
  fetchAllComments,
} from "../../services/apiCalls";
import AnimatedAlertBox from "../utility/AnimatedAlertBox";
import CommentCard from "./CommentCard";

const CommentBox = ({ Data }) => {
  const { UserDetails } = useContext(DataContext);
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState({});
  const [CommentReq, setCommentReq] = useState({
    name: "",
    postID: "",
    comment: "",
    date: new Date(),
  });
  const [Comments, setComments] = useState([]);
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [IsLoadComment, setLoadComment] = useState(false);

  const { setAlertData } = useContext(DataContext);

  useEffect(() => {
    const getAllComments = async () => {
      let response = await fetchAllComments(
        `commentController/getAllComments/${Data._id}`
      );
      setComments(response.comments);
    };
    getAllComments();
  }, []);

  const handleChange = (e) => {
    setCommentReq({
      ...CommentReq,
      name: UserDetails.name,
      postID: Data._id,
      comment: e.target.value,
    });
    setMessage(e.target.value);
  };

  const addComment = async () => {
    let goto = true;
    let error = {};
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (Message === "") {
      goto = false;
      error["message"] = "*Please enter message";
    }
    if (Name === "") {
      goto = false;
      error["name"] = "*Please enter name";
    }
    if (Email === "") {
      goto = false;
      error["email"] = "*Please enter email address";
    } else if (!regex.test(Email)) {
      goto = false;
      error["email"] = "*Please enter valid email address";
    }
    setError(error);
    if (goto) {
      let commentRequest = CommentReq;
      commentRequest.name = Name;
      commentRequest.email = Email;
      let response = await addNewComment(
        `commentController/addNewComment`,
        CommentReq
      );
      if (response?.statusCode === 201) {
        let allComments = await fetchAllComments(
          `commentController/getAllComments/${Data._id}`
        );
        setComments(allComments.comments);

        setAlertData({
          IsShow: true,
          Status: response.statusCode,
          Message: response.message,
        });
        setMessage("");
        setEmail("");
        setName("");
        setLoadComment(!IsLoadComment);
      } else {
        setAlertData({
          IsShow: true,
          Status: response?.statusCode,
          Message: response?.message,
        });
      }
    }
  };

  const deleteComment = async (id) => {
    let respsone = await deleteCommentById(
      `commentController/deleteComment/${id}`
    );
    if (respsone.statusCode === 200) {
      let response = await fetchAllComments(
        `commentController/getAllComments/${Data._id}`
      );
      setComments(response.comments);

      setAlertData({
        IsShow: true,
        Status: respsone.statusCode,
        Message: respsone.message,
      });
      setLoadComment(!IsLoadComment);
    } else {
      setAlertData({
        IsShow: true,
        Status: respsone.statusCode,
        Message: respsone.message,
      });
    }
  };

  return (
    <div className="commentBox py-10">
      <div>
        <div className="search-sec shadow-md">
          <p className="  border-l-4 border-[#f53855] py-2 text-lg text-black px-2 font-semibold">
            Comments 😀
          </p>
          {Comments.length > 0 &&
            Comments.map((comment) => (
              <CommentCard comment={comment} deleteComment={deleteComment} />
            ))}
        </div>
        <div className="search-sec shadow-md mt-24">
          <p className="  border-l-4 border-[#f53855] py-2 text-lg text-black px-2 font-semibold">
            Share your Comments 😊{" "}
          </p>
          <div className="flex flex-wrap -m-2 p-10">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#f53855] focus:bg-white focus:ring-1 focus:ring-[#f53855] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setName(e.target.value)}
                  value={Name}
                />
              </div>
              <span className="text-sm text-red-600">{Error.name}</span>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#f53855] focus:bg-white focus:ring-1 focus:ring-[#f53855] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                />
              </div>
              <span className="text-sm text-red-600">{Error.email}</span>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  for="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#f53855] focus:bg-white focus:ring-1 focus:ring-[#f53855] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  onChange={handleChange}
                  value={Message}
                ></textarea>
                <span className="text-sm text-red-600">{Error.message}</span>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                className="  border-0 py-3 px-8  text-white bg-[#f53855]  focus:outline-none hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)] hover:bg-[#f53855] rounded text-lg font-semibold"
                onClick={addComment}
              >
                Send Emotion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
