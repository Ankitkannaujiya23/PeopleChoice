//for making context we need to import createContext and few steps which are given below
import { createContext, useState } from "react";

// we need to export createContext 
export const DataContext = createContext(null);


const DataProvider = ({ children }) => {
    const [UserDetails, setUserDetails] = useState({ name: '', email: '' });
    const [AlertData, setAlertData] = useState({ IsShow: false, Status: 0, Message: '' });
    
    return (
        <>
            <DataContext.Provider value={{
               UserDetails,
               setUserDetails, 
                AlertData,
                setAlertData
            }}>
                {children}
            </DataContext.Provider>
        </>
    )
}

export default DataProvider;