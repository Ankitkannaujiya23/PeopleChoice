import React from 'react'

const ComingSoon = ({name}) => {

   
  return (
    <div className='ComingSoon  max-h-screen p-28 mt-16 bg-purple-900 '>
        <div className="img-sec w-full rounded flex items-center justify-center">
            <img className='rounded-md h-96' src={require(`../../assets/images/comingSoon/${name ? name : "coming_soon"}.jpg`)} alt="" />
        </div>
    </div>
  )
}

export default ComingSoon
