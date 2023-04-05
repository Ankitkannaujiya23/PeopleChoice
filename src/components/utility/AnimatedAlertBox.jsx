import React, { useEffect, useState } from 'react'
import {TfiClose} from 'react-icons/tfi'
import {GoVerified} from 'react-icons/go'
import{TiWarning} from 'react-icons/ti'


const AnimatedAlertBox = ({ Status, Message }) => {

    const [IsTostActive, setTostActive] = useState(true);
    const [ProgessActive, setProgessActive] = useState('active');

    useEffect(() => {

        setTostActive(true);
        setProgessActive('active');

        timer1();
        timer2();
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
    
        };
    }, []);

    
const timer1 = () => {

    setTimeout(() => {
        setTostActive(false);
    }, 5000)
};

const timer2 = () => {
    
    setTimeout(() => {
        setTostActive(false);
    }, 5300)
};

    const CloseAlert = () => {
        setProgessActive('');
        setTostActive(false)
        setTimeout(() => {
            setProgessActive("");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
    }

    return (
        <div className='z-30'>
            <div className={` ${IsTostActive ? 'toast active ': 'toast'} `}>
                <div className="toast-content">
                    { Status ? <GoVerified className='check text-green-600  '/> :<TiWarning className='check text-[#f53855]'/>}
                    <div className="message">
                        <span className={`text text-1 ${Status ? "text-green-600" :"text-[#f53855]"}`}>{Status ? "Success":"Warning"}</span>
                        <span className="text text-2">{Message ? Message :"Something went wrong !!!"}</span>
                    </div>
                </div>
                <TfiClose className='close text-black' onClick={CloseAlert}/>
                <div className={`progress ${ProgessActive} `}></div>
            </div>
        </div>
    )
}

export default AnimatedAlertBox
