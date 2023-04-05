import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = ({name}) => {
    
  return (
    <>
     <div className="thankyou">
     <div className="bg-slate-800 p-6 flex flex-col justify-center items-center rounded">
                <div className="img">
                        <img src={require('../../assets/images/homepage/thankyou.png')} alt="thankyou" className='w-28' />
                </div>
                <div className="text-start text-lg mb-3 text-white">
                    <p>Dear <span className='text-indigo-500'>{name}</span>, Thank you so much for Contacting us.</p>
                    <p>We will contact you soon</p>
                </div>
                <Link to='/' className='px-5 py-2 bg-indigo-500 text-white text-lg rounded'>Explore</Link>
            </div>   
     </div> 
    </>
  )
}

export default ThankYou
