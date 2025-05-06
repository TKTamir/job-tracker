import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import './App.css'
import Home from "./pages/Home/Home.tsx";
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
    <div>
      <Home/>
    </div>
  )
}

export default App;
