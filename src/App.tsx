import React, {Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import Home from "./pages/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import JobApplications from "./components/JobApplications/JobApplications.tsx";
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
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/jobapplications" element={<JobApplications/>}/>
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </div>
  )
}

export default App;
