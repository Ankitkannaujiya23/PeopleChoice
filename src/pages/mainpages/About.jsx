import React, {useContext} from 'react'
import AnimatedAlertBox from '../../components/utility/AnimatedAlertBox'
import { DataContext} from '../../contextAPI/DataProvider';

const About = () => {

  const{setAlertData}=useContext(DataContext);

  const showAlert=()=>{
    setAlertData({
      IsShow:true,
      Status:200,
      Message:"Click from About page."
    });
  }
  

  return (
    <>
    <div className="about ">
    <section className="text-gray-800 bg-[#f8f8f8] body-font bg-gradient-to-t from-white to-transparent">
  <div className="container px-5 py-24 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto">
      <div className="rounded-lg h-64 overflow-hidden">
        <img alt="content" className="object-cover object-center h-full w-full" src={require('../../assets/images/homepage/about.jpg')}/>
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
          <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <h2 className="font-medium title-font mt-4 text-black text-lg">Harry Developer</h2>
            <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            <p className="text-base text-gray-800">Hello Dear this is Harry as you know i am web Developer, this is my website and that is only for learning purpose of concepts against the Api's.</p>
          </div>
        </div>
        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          <p className="leading-relaxed text-lg mb-4">This the dummy website, i created this website for my learning purpose where i created the application using tailwind css and react this website not claiming anything, the all information which provided in website i don'nt know this is correct or not. its only for learning purpose thank you !</p>
          <a className="text-indigo-400 inline-flex items-center" onClick={showAlert}>Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
    </>
  )
}

export default About