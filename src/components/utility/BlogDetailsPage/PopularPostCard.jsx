import React from 'react'

const PopularPostCard = () => {
  return (
    <div>
      <div className="flex items-center border-b-2">
        <div className="img-sec ">
        <img src={require('../../../assets/images/blogPost/noFile.jpg')} className='w-32 h-28' alt="blog image" />
        </div>
        <div className="text-sec">
    <p className='text-gray-500'>there is date format</p>
    <p className='text-gray-700'>This is Blog title and its main title skjdfhsjf skfhakjsfdhks sdjhfkjshfdkj</p>
        </div>
      </div>
    </div>
  )
}

export default PopularPostCard
