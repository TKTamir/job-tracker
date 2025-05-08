import React, {Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import './App.css'
import Navbar from "./components/NavBar/Navbar.tsx";
import Home from "./pages/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import JobApplications from "./components/JobApplications/JobApplications.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {setUserFromToken} from "./state/auth/authSlice.ts";
import {AppDispatch} from "./state/store.ts";


const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setUserFromToken(token));
    }
  }, [dispatch]);


  return (
    <div className="min-h-screen flex flex-col">
      <Router basename={import.meta.env.BASE_URL}>
        <>
          <Navbar/>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home/>
              </Suspense>}/>
            <Route path="/dashboard" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard/>
              </Suspense>}/>
            <Route path="/jobapplications" element={
              <Suspense fallback={<div>Loading...</div>}>
                <JobApplications/>
              </Suspense>}/>
          </Routes>
          <Footer/>
        </>
      </Router>
    </div>
  )
}

export default App;
