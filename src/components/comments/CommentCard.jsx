import React, { useContext } from 'react'
import { DataContext } from '../../contextAPI/DataProvider'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteCommentById } from '../../services/apiCalls'

const CommentCard = ({ comment,  deleteComment }) => {
  const { UserDetails } = useContext(DataContext)

  return (
    <>
      <div className="grid grid-cols-12 border-b-2 rounded ">
        <div className="col-span-2 img-sec ml-3  relative">
          <img src={require('../../assets/images/blogPost/fileUplod.jpg')} className='absolute top-8 border-2 border-gray-500 right-3 rounded-full w-16 h-16 ' alt="blog image" />
        </div>
        <div className="col-span-10 text-sec py-6 pr-3 pl-1 ">
          <p className='text-lg font-semibold text-[#262566] '>{comment.name}</p>
          <div className="flex justify-between items-center">
          <p className='text-gray-500 '>{comment.date}</p>
          <p>{UserDetails.name === comment.name && <RiDeleteBin6Line className='text-red-500 cursor-pointer' onClick={() => deleteComment(comment._id)} />}</p>
          </div>
          <p className='text-gray-700 mb-4'>{comment.comment} </p>
          <button className="inline-block px-4 py-1 text-[#f53855]  font-semibold  leading-snug outline outline-1  outline-[#f53855]  rounded-full hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)] hover:bg-[#f53855] hover:text-white  focus:shadow-lg  focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
          >Reply</button>
        </div>
      </div>

    </>
  )
}

export default CommentCard