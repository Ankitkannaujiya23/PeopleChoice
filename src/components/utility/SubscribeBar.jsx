import React, { useContext, useState } from 'react'
import { DataContext } from '../../contextAPI/DataProvider';
import { addSubscriber } from '../../services/apiCalls';

const SubscribeBar = () => {

    const[Email, setEmail]=useState('');
    const[Error,setError]=useState({});
    const{setAlertData}=useContext(DataContext);

    const subscribe= async()=>{
        let goto = true;
        let error = {};
        let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (Email === "") {
          goto = false;
          error["email"] = "*Enter Email address";
        } else if (!emailRegex.test(Email)) {
          goto = false;
          error["email"] = "*Enter valid Email"
        }
        setError(error);
        if (goto) {
            let model={
                email:Email
            }
            let response= await addSubscriber('commonMethodController/addSubscriber', model);
            if(response?.statusCode===200){
                setEmail('');
                setAlertData({IsShow:true, Status:response.statusCode, Message:response.message});
            }else{
                setAlertData({IsShow:true, Status:response.statusCode, Message:response.message});
            }
        }
    }


    return (
        <div className='subscribe   lg:px-44 drop-shadow-xl px-3  md:px-0'>
            <div className="main-body flex-col lg:flex-row md:flex-row   flex justify-between shadow-[0_0_1px_0px_rgba(0,0,0,0.3)] bg-white rounded-md space-x-5 lg:py-16 md:py-16 md:px-14 lg:px-14 px-4 py-4 ">
                <div className="textArea lg:w-1/3 md:w-1/3 w-10/12 ">
                    <h1 className='text-3xl font-semibold text-black'>Subscribe Now for Get Special Features!</h1>
                    <p>Let's subscribe with us and find the fun.</p>
                </div>
                <div className="inputArea">
                    <div className="flex w-full md:justify-start mt-3 items-end">
                        <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                            <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">Email </label>
                            <input type="text" id="hero-field" name="email" value={Email} className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='example@mail.com' onChange={(e)=> setEmail(e.target.value)} />
                        </div>
                        <button
                            type="button"
                            className="inline-block px-7 py-3 bg-[#f53855] text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)]   focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out" onClick={subscribe} > Subscribe</button>
                    </div> 
                            <span className='text-sm text-red-600'>{Error.email}</span>
                </div>  

            </div>
        </div>
    )
}

export default SubscribeBar
