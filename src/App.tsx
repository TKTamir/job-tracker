import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home/Home.tsx";
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
      <NavBar/>
      <div className="flex-grow">
        <Home/>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
