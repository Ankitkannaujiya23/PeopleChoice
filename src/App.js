import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { AlertContext, DataContext } from './contextAPI/DataProvider';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import HomePage from './pages/mainpages/HomePage';
import About from './pages/mainpages/About';
import Contact from './pages/mainpages/Contact';
import Login from './pages/accounts/Login';
import Signup from './pages/accounts/Signup';
import Footer from './components/utility/Footer';
import Navbar from './components/utility/Navbar';
import AdminHomePage from './components/admin/AdminHomePage';
import CreatePost from './components/admin/CreatePost';
import BlogDetailsPage from './pages/mainpages/BlogDetailsPage';
import UpdatePost from './components/admin/UpdatePost';
import ComingSoon from './components/utility/ComingSoon';
import Error404Page from './components/utility/Error404Page';
import AnimatedAlertBox from './components/utility/AnimatedAlertBox';


// for make private routing and add direct access url blocking 

const PrivateRoute = ({ IsLoggedIn, ...props }) => {
  return (IsLoggedIn ?
    <>
      <Outlet />
    </>
    : <Navigate replace to='/login' />
  )

}



function App() {

  // take a state to check the user is logged in or not 
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const { AlertData, setAlertData } = useContext(DataContext);

  useEffect(() => {
    let hideAlert = setTimeout(() => {
      setAlertData({ IsShow: false, Status: 0, Message: "" });
    }, 5200)

    return () => {
      clearTimeout(hideAlert);
    };
  }, [AlertData.IsShow]);


  return (
    <div className="App relative">
      <Router>
        <Navbar />
        {AlertData.IsShow && <AnimatedAlertBox Status={(AlertData.Status ===200 || AlertData.Status ===201) ? true :false } Message={AlertData.Message} />}
        <Routes>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/' element={<PrivateRoute IsLoggedIn={IsLoggedIn} />}>

            <Route path='/' element={<HomePage />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/adminPanel' element={<PrivateRoute IsLoggedIn={IsLoggedIn} />} >
            <Route path='/adminPanel' element={<AdminHomePage />} />
          </Route>
          <Route path='/createPost' element={<PrivateRoute IsLoggedIn={IsLoggedIn} />}>
            <Route path='/createPost' element={<CreatePost />} />
          </Route>
          <Route path='/blogDetails/:id' element={<PrivateRoute IsLoggedIn={IsLoggedIn} />}>
            <Route path='/blogDetails/:id' element={<BlogDetailsPage />} />
          </Route>
          <Route path='/updateBlog/:id' element={<PrivateRoute IsLoggedIn={IsLoggedIn} />}>
            <Route path='/updateBlog/:id' element={<UpdatePost />} />
          </Route>
          <Route path='/comingsoon' element={<ComingSoon />} ></Route>
          <Route path='/*' element={<Error404Page />} ></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
